import {checkPassword} from "./checkPassword";
import {createHash} from "./createHash";

export function setNewPassword(newPassword:string, hash:string):string{

    if(!checkPassword(newPassword,hash)){
        return createHash(newPassword)
    }

}