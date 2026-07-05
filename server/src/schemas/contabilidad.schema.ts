import { z } from "zod";

// Esquema de VENTAS
export const CreateVentaSchema = z.object({
  fecha: z.string({ message: "La fecha es obligatoria" }).or(z.date()), 
  
  tipo_comprobante: z.enum(['Factura', 'Boleta', 'Recibo'], {
    message: "Seleccione un tipo de comprobante válido (Factura, Boleta o Recibo)"
  }),
  
  serie_comprobante: z.string()
    .min(2, "La serie es obligatoria"),

  subtotal: z.number({ message: "El subtotal solo acepta números" })
    .positive("El subtotal debe ser mayor a 0"),

  igv: z.number({ message: "El IGV solo acepta números" })
    .min(0, "El IGV no puede ser negativo"),

  total: z.number({ message: "El total solo acepta números" })
    .positive("El total debe ser mayor a 0"),
  
  cliente_id: z.number({ message: "El ID del cliente debe ser un número" })
    .int().positive().optional().nullable(),
  
  cliente_nombre_manual: z.string()
    .min(3, "El nombre debe tener al menos 3 letras")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras")
    .optional()
    .nullable(),

  descripcion: z.string()
    .max(255, "La descripción es demasiado larga")
    .optional()
    .nullable()
});

// Esquema de COMPRAS
export const CreateCompraSchema = z.object({
  fecha: z.string({ message: "La fecha es obligatoria" }).or(z.date()),
  
  proveedor: z.string()
    .min(3, "El nombre del proveedor es obligatorio"),
  
  tipo_comprobante: z.enum(['Factura', 'Boleta', 'Recibo'], {
    message: "Seleccione un comprobante válido (Factura, Boleta o Recibo)"
  }),
  
  serie_comprobante: z.string()
    .min(2, "La serie es obligatoria"),
  
  subtotal: z.number({ message: "El subtotal solo acepta números" })
    .positive("Debe ser mayor a 0"),
    
  igv: z.number({ message: "El IGV solo acepta números" })
    .min(0),
    
  total: z.number({ message: "El total solo acepta números" })
    .positive("Debe ser mayor a 0")
});