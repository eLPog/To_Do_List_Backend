import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {

}

export const httpFormater = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err){
        res.status(400).json(err.message)
    }else{
        next();
    }
}
