import {Request, Response} from "express";

export function notFoundHandler(req:Request,res:Response):void{
    res.status(404).json('Page doesnt exist')

}