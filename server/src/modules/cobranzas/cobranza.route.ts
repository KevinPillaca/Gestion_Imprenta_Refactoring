import { Router } from "express";
import { CobranzaController } from "./cobranzas.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.schema";
import { CreateCobranzaSchema, CreateAbonoSchema } from "../../schemas/cobranzas.schema";

const router = Router();
const controller = new CobranzaController();

router.get("/", AuthMiddleware.validateJWT, (req, res) =>  controller.show(req, res));
router.post("/", AuthMiddleware.validateJWT, validate(CreateCobranzaSchema), (req, res) =>  controller.create(req, res));
router.post("/abonos", AuthMiddleware.validateJWT,validate(CreateAbonoSchema), (req, res) => controller.storeAbono(req, res));
router.get("/:id/abonos", AuthMiddleware.validateJWT, controller.getHistory);
export { router as CobranzaRouter };
