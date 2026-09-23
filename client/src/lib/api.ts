const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;
  details?: unknown;

  constructor(message: string, status: number, fields?: Record<string, string>, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
    this.details = details;
  }
}

class ApiClientClass {
  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private handleUnauthorized() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    if (!window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      ...this.getHeaders(),
      ...(options.headers as Record<string, string>),
    };

    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      if (res.status === 401) {
        this.handleUnauthorized();
      }

      let parsed: { error?: string; fields?: Record<string, string>; details?: unknown } = {};
      try {
        parsed = await res.json();
      } catch {
        parsed = { error: res.statusText || 'Request failed' };
      }

      throw new ApiError(
        parsed.error || `HTTP Error ${res.status}`,
        res.status,
        parsed.fields,
        parsed.details
      );
    }

    // Handle 204 No Content
    if (res.status === 204) {
      return {} as T;
    }

    return res.json();
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const url = new URL(`${API_BASE}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        // Correct non-falsy check: allows 0 and false
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return this.request<T>(url.pathname + url.search, { method: 'GET' });
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClientClass();