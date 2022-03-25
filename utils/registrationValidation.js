import {validationEmail} from "./validationEmail.js";

export function registrationValidation(email,password,password2,name){
    if (((!email || !name || !password) || password !== password2) || !validationEmail(email)){
        return false;
    }
    return !(email.trim().length < 1 || password.trim().length < 5 || name.trim().length < 1);

}