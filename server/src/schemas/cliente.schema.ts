import { z } from "zod";

export const CreateClienteSchema = z.object({
  // Solo letras (incluyendo espacios y tildes)
  nombre_razon_social: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .regex(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,&]+$/, "El nombre contiene caracteres no permitidos"),

  // Solo números entre 8 y 11 dígitos
  ruc_dni: z.string()
    .min(8, "Mínimo 8 dígitos")
    .max(11, "Máximo 11 dígitos")
    .regex(/^\d+$/, "El DNI/RUC solo debe contener números"),

  // Opcional, pero si lo envía, debe tener 9 dígitos numéricos
  telefono: z.string()
    .length(9, "El teléfono debe tener exactamente 9 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números")
    .optional()
    .or(z.literal("")),

  // Formato email estricto
  correo: z.string()
    .email("El formato del correo no es válido")
    .optional()
    .or(z.literal("")),

  // Letras y números (ideal para direcciones)
  direccion: z.string()
    .min(5, "Dirección muy corta")
    .regex(/^[a-zA-Z0-9\s.,#-]+$/, "Dirección con caracteres no permitidos")
    .optional()
    .or(z.literal("")),

  // Solo letras para el departamento
  departamento: z.string()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El departamento solo debe contener letras")
    .optional()
    .or(z.literal("")),
});

// El Update hereda todo pero hace que cada campo sea opcional para el PATCH/PUT
export const UpdateClienteSchema = CreateClienteSchema.partial();