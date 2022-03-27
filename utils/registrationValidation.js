import {validationEmail} from "./validationEmail.js";

export function registrationValidation(email,password,password2,name){
    if(!email || !validationEmail(email) || email.trim().length < 1){
        return false
    }
    if(!name || name.trim().length < 1){
        return false
    }
    if(!password || password.trim().length < 5){
        return false
    }
    return password === password2;



}