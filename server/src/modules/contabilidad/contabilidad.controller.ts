import { Response, Request } from "express";
import { BaseController } from "../../shared/error.catch";
import { ContabilidadService } from "./contabilidad.service";

export class ContabilidadController extends BaseController{
    private ContabilidadService: ContabilidadService;

    constructor() {
        super();
        this.ContabilidadService = new ContabilidadService();
    }
    
    //Crear Ventas (POST)

    public CreateVenta = async ({body}:Request, res: Response) => {
        try {
        const newVenta = await this.ContabilidadService.createVenta(body);
        return res.status(200).json({
            ok:true,
            message:"Venta registrada",
        })
        } 
        catch (error) {
            return this.handleError(res, error, "Error al registrar venta");
        }
    };

    //Crear Compras (POST)
    public CreateCompra = async({body}:Request, res:Response) => {
        try {
            const newCompra = await this.ContabilidadService.createCompra(body);
            return res.status(200).json({
                ok:true,
                message:"Compra registrada"
            });
        }
        catch (error){
            return this.handleError(res, error, "Error al registrar compra");
        }
    };

    //Listar Compras y Ventas x Mes (GET)
    public GetReporteAnual = async (req: Request, res: Response) => {
        try{
            const anio = req.query.anio ? Number(req.query.anio) : new Date().getFullYear();
            const data = await this.ContabilidadService.getResumenRER(anio);
            return res.status(200).json({ ok: true, data });
        }
        catch (error){
            return this.handleError(res, error, "Error al generar el reporte anual");
        }

    };
};