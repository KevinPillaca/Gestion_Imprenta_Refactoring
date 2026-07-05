import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({

  destination: (_req, _file, cb) => {
    cb(null, 'uploads/productos');
  },

  filename: (_req, file, cb) => {

    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  }
      
});

export const uploadProducto = multer({
  storage
});

// 🌟 AGREGAMOS EL PREPARADOR AQUÍ ABAJO (Misma temática, cero suciedad en el router)
export const prepareProductImage = (req: Request, _res: Response, next: NextFunction) => {
  if (req.file) {
    // Apuntamos exactamente a la carpeta donde Multer lo acaba de guardar
    req.body.url_imagen = `/uploads/productos/${req.file.filename}`;
  }
  next();
};