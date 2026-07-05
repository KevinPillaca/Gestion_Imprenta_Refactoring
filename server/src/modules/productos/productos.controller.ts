import { Request, Response } from "express";
import { ProductService } from "./productos.service";
import { BaseController } from "../../shared/error.catch";

export class ProductController extends BaseController {
    private ProductService : ProductService;

    constructor(){
        super();
        this.ProductService = new ProductService();}

    //Crear Producto(POST)
    public create = async (req: Request, res: Response) =>{
        try {
            const body = req.body;
            if (req.file) {
                body.url_imagen =
                    `/uploads/productos/${req.file.filename}`;
            }

            await this.ProductService.CreatProduct(body);
            return res.status(201).json({message: "Producto creado exitosamente"});
            } 
        catch (error) {
            return this.handleError(res, error, "Error al Crear el Producto");
            }
    };

    //Listar Producto(GET)
    public show = async (_req:Request, res:Response) => {
        try {
            const producto = await this.ProductService.ShowProduct();
            return res.status(200).json(producto);
            }
        catch (error) {
            return this.handleError(res, error, "Error al Procesar Producto");
            }   
    };

    //Editar Producto(PUT)
    public edit = async (req: Request, res: Response) => {
        try{
            const { id } = req.params; 
            const body = req.body;
            await this.ProductService.EditProduct(Number(id), body);
            return res.status(200).json({message:"Producto Actualizado Correctamente"});
        }
        catch(error){
            return this.handleError(res, error, "Error al Procesar la Actualizacion");
        }
    }

    //Eliminar Producto(DELETE)
    public delete = async (req: Request, res: Response) =>{
        try{
            const { id } = req.params;
           await this.ProductService.DeleteProduct(Number(id));
           return res.status(200).json({
            ok:true,
            message:"El Producto se Elimino Correctamente"
           });
        }
        catch (error) {
            return this.handleError(res, error, "Error al Procesar la Eleminacion");
        }
    }


    //-------------------
    //---MOSTRAR CATEGORIAS---
    public showCategorias = async (_req: Request, res: Response) => {
        try {
            const categorias = await this.ProductService.ShowCategorias();
            // Devolvemos el array directo para que Angular lo reciba limpio
            return res.status(200).json(categorias);
        } catch (error) {
            return this.handleError(res, error, "Error al obtener las categorías");
        }
    };
    

}

