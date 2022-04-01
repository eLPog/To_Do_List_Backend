import * as bcrypt from 'bcrypt'

export function checkPassword(password:string,hash:string):boolean{
    return bcrypt.compareSync(password,hash)
}