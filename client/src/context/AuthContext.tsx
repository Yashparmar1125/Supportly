import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { AuthState, LoginResponse } from '../types';
import { apiClient } from '../lib/api';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Checks if a JWT token is unexpired without requiring external libraries
 */
function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    // URL-safe base64 decode
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    if (!decoded.exp) return true;
    // Check if token expiration is in the future
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ token: null, user: null, isAuthenticated: false });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      if (isTokenValid(token)) {
        try {
          setAuthState({
            token,
            user: JSON.parse(userStr),
            isAuthenticated: true,
          });
        } catch {
          logout();
        }
      } else {
        // Automatically purge expired session on startup
        console.warn('Session token expired; purging local state.');
        logout();
      }
    }
    setIsLoading(false);

    // Listen to custom unauthorized event dispatched by ApiClient
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [logout]);

  const login = async (username: string, password: string) => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', {
      username,
      password,
    });

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setAuthState({
      token: response.token,
      user: response.user,
      isAuthenticated: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};