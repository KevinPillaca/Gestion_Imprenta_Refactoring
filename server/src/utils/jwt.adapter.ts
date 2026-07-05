import jwt, { SignOptions } from 'jsonwebtoken';
import { Envs } from '../config/envs';

export class JwtAdapter {
  static async generateToken(payload: any, duration: string = '8h'): Promise<string | null> {
    return new Promise((resolve) => {
      
      // Definimos las opciones con un tipo explícito para evitar confusiones
      const options: SignOptions = {
        expiresIn: duration as any // Forzamos a que acepte el string de duración
      };

      // Usamos el secret asegurándonos de que sea un string
      jwt.sign(payload, String(Envs.JWT_SECRET), options, (err, token) => {
        if (err) {
          console.error('[JWT Error]:', err);
          return resolve(null);
        }
        resolve(token || null);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, String(Envs.JWT_SECRET), (err, decoded) => {
        if (err) return resolve(null);
        
        resolve(decoded as T);
      });
    });
  }
}