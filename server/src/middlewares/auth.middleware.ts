import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../utils/jwt.adapter";

export class AuthMiddleware {
  
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    // 1. Obtener el token del header "Authorization"
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({ message: "No hay token en la petición" });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Formato de token inválido (Bearer)" });
    }

    // 2. Extraer solo el token (quitamos la palabra "Bearer ")
    const token = authorization.split(" ")[1] || "";

    try {
      // 3. Validar el token usando tu JwtAdapter
      const payload = await JwtAdapter.validateToken<{ id: number; usuario: string }>(token);

      if (!payload) {
        return res.status(401).json({ message: "Token no válido o expirado" });
      }

      // 4. Inyectamos la info del usuario en la request por si la necesitamos después
     (req as any).userToken = payload;

      // 5. ¡Todo bien! Continuamos al siguiente paso (el controlador)
      next();

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error interno al validar token" });
    }
  }
}
