import {validationEmail} from "./validationEmail";

export function registrationValidation(email:string,password:string,password2:string,name:string):boolean{
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