export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface TokenI {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}
