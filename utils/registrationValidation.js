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
    if(password!==password2 || name.trim().length < 1 ){
        return false
    }
    return true


    // if (((!email || !name || !password) || password !== password2) || !validationEmail(email)){
    //     return false;
    // }
    // return !(email.trim().length < 1 || password.trim().length < 5 || name.trim().length < 1);

}