import { Request, Response } from "express";
import { CobranzaService } from "./cobranzas.service";
import { BaseController } from "../../shared/error.catch";

export class CobranzaController extends BaseController {
    private service: CobranzaService;

    constructor() {
        super();
        this.service = new CobranzaService();
    }

    //Crear Cobranzas(POST)
    public create = async (req: Request, res: Response) => {
        try {
        const cobranza = await this.service.createCobranza(req.body);
        return res.status(201).json({ ok: true, message: "Cobranza Registrada", data: cobranza });
        } 
        catch (error) {
        return this.handleError(res, error, "Error al crear cobranza");
        }
    };
        
    //Listar Cobranzas(GET)
    public show = async (_req: Request, res: Response) => {
    try {
        const data = await this.service.ShowCobranzas();
        return res.status(200).json({ ok: true, data });
        } 
        catch (error) {
        return this.handleError(res, error, "Error al listar cobranzas");
        }
    };

    //Abono Transacion
    public storeAbono = async (req: Request, res: Response) => {
        try {
        const abono = await this.service.addAbono(req.body);
        return res.status(201).json({ ok: true, message: "Abono registrado", data: abono });
        } catch (error) {
        return this.handleError(res, error, "Error al registrar abono");
        }
    };

    // Obtener abonos por ID de cobranza
    public getHistory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const abonos = await this.service.ShowAbonosByCobranza(Number(id));
            return res.status(200).json({ ok: true, data: abonos });
        } catch (error) {
            return this.handleError(res, error, "Error al obtener historial de abonos");
        }
    };

};