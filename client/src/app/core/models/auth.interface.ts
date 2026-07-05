// Lo que envías al Backend
export interface LoginRequest {
  usuario: string;
  password: string;
}

// Lo que recibes del Backend (Estructura exacta de tu AuthService en Node)
export interface AuthResponse {
  user: {
    id: number;
    usuario: string;
  };
  token: string;
}