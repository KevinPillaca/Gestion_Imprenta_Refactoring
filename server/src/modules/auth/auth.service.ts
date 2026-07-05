import prisma from "../../config/prisma_db";
import { JwtAdapter } from "../../utils/jwt.adapter";
import { LoginDTO } from "./auth.dto";

export class AuthService {
  
  public loginUser = async (data: LoginDTO) => {

    const user = await prisma.administrador.findFirst({
      where: { usuario: data.usuario },
    });

    if (!user) throw new Error("USER_NOT_FOUND");

    if (data.password !== user.password) {
      throw new Error("INVALID_PASSWORD");
    }

    const token = await JwtAdapter.generateToken({
      id: user.id,
      usuario: user.usuario,
    });

    if (!token) throw new Error("INTERNAL_SERVER_ERROR");

    return {
      user: {
        id: user.id,
        usuario: user.usuario,
      },
      token,
    };
  };
}