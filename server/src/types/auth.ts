export interface AuthUser {
  id: number;
  username: string;
  role: string;
}

export interface JwtTokenPayload {
  id: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
