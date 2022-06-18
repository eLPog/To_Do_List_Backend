import {Request, Response} from "express";

export function notFoundHandler(req:Request,res:Response):void{
    res.status(404).json('Im sorry. This page doesnt exist')
    return

}