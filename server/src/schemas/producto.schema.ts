import { z } from "zod";

export const ProductoSchema = z.object({
    // Solo letras (incluyendo espacios y tildes)
    nombre: z.string()
        .min(4,"El nombre debe tener al menos 4 caracteres"),
        
    
    tipo_material: z.string()
        .min(4, "El nombre debe tener al menos 4 caracteres"),
    
    medida: z.string() 
        .min(1, "la medida no puede estar vacio"),
    
    precio: z.coerce.number()
        .positive("El precio debe ser un número positivo")
        .describe("El precio es obligatorio"),
        

    categoria_id: z.coerce.number()
        .min(1, "Debe elegir una categoría"),

    url_imagen: z.string("La imagen es obligatoria")
    .min(1, "La imagen es obligatoria"),
})

//Crea una copia exacta pero ignora 'url_imagen'
export const UpdateProductoSchema = ProductoSchema.omit({ url_imagen: true });