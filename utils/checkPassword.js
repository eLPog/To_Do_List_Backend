import bcrypt from 'bcrypt'

export function checkPassword(password,hash){
    return bcrypt.compareSync(password,hash)
}