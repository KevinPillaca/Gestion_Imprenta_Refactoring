import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const authController = new AuthController();


// Usamos una función de flecha para no perder el contexto de 'this' en el controlador
router.post("/", (req, res) => authController.login(req, res));

export { router as authRoutes };