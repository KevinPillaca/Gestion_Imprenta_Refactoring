import { z } from "zod";

// Validacion de registro Cobranzas
export const CreateCobranzaSchema = z.object({
  cliente_id: z.number({ message: "El ID del cliente debe ser un número" })
    .int().positive().optional().nullable(),
  
  nombre_cliente_manual: z.string()
    .min(3, "El nombre del cliente manual debe tener al menos 3 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras")
    .optional()
    .nullable(),

  cotizacion_id: z.number({ message: "La cotización debe ser un número" })
    .int().positive().optional().nullable(),

  concepto: z.string()
    .min(5, "El concepto debe tener al menos 5 caracteres")
    .max(155, "Concepto demasiado largo"),

  monto_total: z.number({ message: "El monto total solo acepta números" })
    .positive("El monto total debe ser un número mayor a 0"),

}).refine(data => data.cliente_id || data.nombre_cliente_manual, {
  message: "Debe proporcionar un cliente registrado o un nombre manual",
  path: ["nombre_cliente_manual"]
});

// Validacion de Abono
export const CreateAbonoSchema = z.object({
  cobranza_id: z.number({ message: "ID de cobranza inválido" })
    .int().positive(),

  monto_abonado: z.number({ message: "El monto del abono solo acepta números" })
    .positive("El monto a abonar debe ser mayor a 0"),

  metodo_pago: z.enum(['Efectivo', 'Transferencia', 'Yape_Plin', 'Tarjeta'], {
    message: "Seleccione un método válido (Efectivo, Transferencia, Yape_Plin o Tarjeta)"
  }),

  nota_pago: z.string()
    .max(255, "La nota es demasiado larga")
    .optional()
    .nullable(),
});