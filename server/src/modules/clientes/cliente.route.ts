import { Router } from "express";
import { ClienteController } from "./cliente.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.schema";
import { CreateClienteSchema, UpdateClienteSchema } from "../../schemas/cliente.schema";

const router = Router();
const controller = new ClienteController();

// Rutas protegidas con el middleware que ya tienes
router.post("/", AuthMiddleware.validateJWT,validate(CreateClienteSchema),(req, res) => controller.Create(req, res));
router.get("/", AuthMiddleware.validateJWT,(req, res) => controller.show(req, res));
router.put("/:id", AuthMiddleware.validateJWT,validate(UpdateClienteSchema),(req, res) => controller.edit(req, res));
router.delete("/:id", AuthMiddleware.validateJWT,(req, res) => controller.delete(req, res));

router.get("/total", AuthMiddleware.validateJWT,(req, res) => controller.count(req, res));

router.get("/export", AuthMiddleware.validateJWT, (req, res) => controller.exportExcel(req, res));

export { router as ClienteRouter};