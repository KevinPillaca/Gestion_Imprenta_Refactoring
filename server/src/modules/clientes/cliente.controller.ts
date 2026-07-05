import { Request,Response } from "express";
import { ClienteService } from "./cliente.service";
import { BaseController } from "../../shared/error.catch";



export class ClienteController extends BaseController{
    
    private ClienteService: ClienteService;
    
    constructor(){
        super();
        this.ClienteService = new ClienteService;    
    }

     //Crear Cliente(POST)
    public Create = async ({body}: Request, res:Response) => {
        try{
            const newCliente = await this.ClienteService.CreateCliente(body);
            return res.status(200).json({message: "Producto creado exitosamente"});
        }
        catch (error){
            return this.handleError(res, error, "Error al Crear el Cliente");
        }
    };
    
     //Listar Cliente(GET)
    public show = async (_req: Request, res:Response) => {
        try{
            const clientes = await this.ClienteService.ShowCliente();
            return res.status(200).json({
                ok: true,
                data:clientes
            });
        }
        catch (error){
             return this.handleError(res, error, "Error al Procesar Clientes");
        }
    };

     //Editar Cliente(PUT)
    public edit = async (req: Request, res: Response) => {
        try{
            const { id } = req.params; 
            const body = req.body;
            const clientes = await this.ClienteService.EditCliente(Number(id), body);
            return res.status(200).json({
                ok:true,
                massage:"Cliente Actualizado Correctamente",
                data:clientes
            }); 
        }
        catch (error){
            return this.handleError(res, error, "Error al Procesar la Actualizacion");
        }     
    };

     //Eliminar Cliente(DELETE)
    public delete = async (req:Request, res: Response) => {
        try{
            const {id} = req.params;
            await this.ClienteService.DeleteCliente(Number(id));
            return res.status(200).json({
                ok:true,
                massage:"Cliente Eliminado Correctamente",
            });
        }
        catch (error){
            return this.handleError(res, error, "Error al Procesar la Eleminacion");
        }
    };

};