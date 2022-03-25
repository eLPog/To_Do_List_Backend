import jwt from 'jsonwebtoken'
import {jwtAccessKey} from "../app/config.js";
import {TokenModel} from "../models/tokenModel.js";

export async function isAuth(req, res, next){
    const token = req.headers.authorization?.split(' ')[1];
    const tokens = await new TokenModel().getTokens()
    const checkToken = tokens.filter(el=>el.token===token)
    if (!token || checkToken.length===0) {
         res.status(401).json('Token invalid');
        return
    }

    jwt.verify(token, jwtAccessKey, (err, data) => {
        if (err) {
            return res.status(401).json('Token invalid');
        }
        req.user = data;
        next();
    });
}