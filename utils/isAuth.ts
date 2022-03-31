import * as jwt from 'jsonwebtoken';
import { jwtAccessKey } from '../app/config';
import { TokenModel } from '../models/tokenModel';
import {NextFunction, Response} from "express";
import {UserFromRequest} from "../types/UserFromRequest";
import {UserInterface} from "../types/UserInterface";

export async function isAuth(req:UserFromRequest, res:Response, next:NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  const tokens = await new TokenModel().getTokens();
  const checkToken = tokens.filter((el) => el.token === token);
  if (!token || checkToken.length === 0) {
    res.status(401).json('Token invalid');
    return;
  }

  jwt.verify(token, jwtAccessKey, (err, data:UserInterface) => {
    if (err) {
      return res.status(401).json('Token invalid');
    }
    req.user = data;
    next();
  });
}
