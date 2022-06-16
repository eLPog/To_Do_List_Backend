import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {}
export class UnexpectedError extends Error{}
export class ConflictError extends Error{}

export const httpFormater = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err){
        if(err instanceof ValidationError){
        res.status(400).json(err.message)
            return
        }
        if(err instanceof ConflictError){
            res.status(409).json(err.message)
            return
        }
        res.status(500).json(`Unexpected error. Please try again. ${err.message}`)
        return
    }else{
        next();
    }
}
