import { Router } from "express";
import { ContabilidadController } from "./contabilidad.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.schema";
import { CreateVentaSchema, CreateCompraSchema } from "../../schemas/contabilidad.schema";
const router = Router();
const controller = new ContabilidadController();

router.post("/ventas", AuthMiddleware.validateJWT, validate(CreateVentaSchema),(req, res) => controller.CreateVenta(req, res));
router.post("/compras",AuthMiddleware.validateJWT, validate(CreateCompraSchema),(req, res) => controller.CreateCompra(req, res));
router.get("/reporte", AuthMiddleware.validateJWT, (req, res) => controller.GetReporteAnual(req, res));

export { router as ContabilidadRouter };