import { Response } from "express";

export class BaseController {
    public handleError(res: Response, error: unknown, message: string) {
        console.error(error); // Necesario para debugear en la terminal
        
        return res.status(500).json({
            message,
        });
    }
}