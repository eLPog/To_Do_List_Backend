import {checkPassword} from "./checkPassword.js";
import {createHash} from "./createHash.js";

export function setNewPassword(newPassword, hash){

    if(!checkPassword(newPassword,hash)){
        return createHash(newPassword)
    } else {
        return false
    }

}