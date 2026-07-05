import { Router } from "express";
import { ProductController } from "./productos.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.schema";
import { ProductoSchema,UpdateProductoSchema } from "../../schemas/producto.schema";

//importamos el middleware de uplooad para guardar las imagenes
import { uploadProducto,prepareProductImage } from '../../middlewares/upload.middleware';

const router = Router();
const controller = new ProductController();

// Rutas protegidas con el middleware que ya tienes
router.post("/", AuthMiddleware.validateJWT,uploadProducto.single('imagen'), prepareProductImage, validate(ProductoSchema),(req, res) => controller.create(req, res));
router.get("/", AuthMiddleware.validateJWT, (req, res) => controller.show(req, res));
router.put("/:id", AuthMiddleware.validateJWT, validate(UpdateProductoSchema),(req, res) => controller.edit(req, res));
router.delete("/:id", AuthMiddleware.validateJWT, (req, res) => controller.delete(req, res));

//Ruta de la tabla categorias
router.get("/categorias", AuthMiddleware.validateJWT, (req, res) => controller.showCategorias(req, res));

export { router as ProductRouter};

