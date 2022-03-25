import bcrypt from 'bcrypt'

export function createHash(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}