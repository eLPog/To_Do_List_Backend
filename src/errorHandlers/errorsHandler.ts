import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {}
export class UnexpectedError extends Error{}

export const httpFormater = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err){
        if(err instanceof ValidationError){
        res.status(400).json(err.message)
        }
        res.status(500).json(`Unexpected error. Please try again. ${err.message}`)
    }else{
        next();
    }
}
