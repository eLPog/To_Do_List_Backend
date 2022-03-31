import {Request} from "express";
import {UserInterface} from "./UserInterface";

export interface UserFromRequest extends Request {
   user:UserInterface
}