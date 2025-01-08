import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        throw new Error("Not implemented yet")
    }
}

export function LoggerGlobal(req: Request, res: Response, next: NextFunction){
    const fecha = new Date()
    console.log(`Ruta ${req.url}, Método ${req.method}, Fecha ${fecha}`)
    next()
}