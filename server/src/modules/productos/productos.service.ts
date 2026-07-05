import prisma from "../../config/prisma_db";
import {CreateProducto,UpdateProducto} from "./productos.dto";

export class ProductService {

    //CREAR PRODUCTO
    public async CreatProduct(data:CreateProducto){
        return  prisma.productos.create({
            data:{
                nombre:data.nombre,
                tipo_material: data.tipo_material,
                precio: data.precio,
                medida: data.medida,
                url_imagen: data.url_imagen,
                categoria_id: data.categoria_id ? Number(data.categoria_id) : undefined
            }
        });
    };
                            
    //MOSTRAR PRODUCTOS
    public async ShowProduct(){
        return prisma.productos.findMany({
            include:{
                categorias:{
                    select:{
                        nombre:true
                    }
                }
            },
            orderBy: {
                producto_id: 'asc' // Los nuevos aparecerán al final de la lista
            }
        });
    };

    //EDITAR PRODUCTOS
    public async EditProduct(id: number, data:UpdateProducto){
        return prisma.productos.update({
            where:{producto_id:id},
            data:{...data},
        });
    };

    //BORRAR PRODUCTOS
    public async DeleteProduct(id : number){
        return prisma.productos.delete({
            where:{
                producto_id:id
            }
        })
    };

    
    //-------------------
    //---MOSTRAR CATEGORIAS---

    public async ShowCategorias() {
        return prisma.categorias.findMany({
            select: {
                id: true,
                nombre: true
            },
            orderBy: {
                id: 'asc'
            }
        });
    }

}


