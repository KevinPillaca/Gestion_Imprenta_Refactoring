import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./auth.dto";

export class AuthController {
  private authService: AuthService;

  constructor() {
    // Instanciamos el servicio dentro del constructor (POO)
    this.authService = new AuthService();
  }

  public login = async (req: Request, res: Response) => {
    try {
      const dto = LoginDTO.create(req.body);

      const response = await this.authService.loginUser(dto);

      return res.status(200).json(response);

    } catch (error: any) {
      const errors: Record<string, number> = {
        USER_NOT_FOUND: 404,
        INVALID_PASSWORD: 401,
        MISSING_FIELDS: 400,
      };

      const status = errors[error.message] || 500;
      const message = status === 500 ? "Internal Server Error" : error.message;

      return res.status(status).json({ message });
    }
  };
}