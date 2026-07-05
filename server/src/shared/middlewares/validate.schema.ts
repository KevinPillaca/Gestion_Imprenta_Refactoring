import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod"; // Cambiamos AnyZodObject por ZodSchema
import fs from 'fs';

export const validate = (schema: ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Intentamos validar el cuerpo de la petición
      schema.parse(req.body); 
      next(); 
    } catch (error) {

      // Si Multer guardó una imagen, la eliminamos
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error eliminando imagen:", err);
          }
        });
      }
      //los mensajes de error de zod
      if (error instanceof ZodError) {
        // Error 400: El cliente mandó datos mal (DNI corto, correo sin @, etc.)
        return res.status(400).json({
          message: "Datos inválidos del formulario", // 👈 error general
          errors: error.issues.map((e) => ({
            campo: e.path[0],
            mensaje: e.message
          }))
        });
      }
      
      // Error 500: Solo si ocurre algo que no es de validación (error de sistema)
      return res.status(500).json({ 
        ok: false, 
        message: "Error interno durante la validación" 
      });
    }
  };