import {awilixSetup} from "../src/di-setup/containerSetup";
import {registrationValidation} from "../src/utils/registrationValidation";
import db from "../src/db/dbConnection"
let cont:any;
let model:any;
let email = 'test@test.com';
let name = 'testUser';
let password = 'password';
beforeAll(async()=>{
    cont = await awilixSetup();
    model= cont.resolve('AuthenticationModel')
})

afterAll(async()=>{
    await db.execute('DELETE FROM users WHERE name LIKE :testString',{
        testString:"testUser%"
    })
   await db.end()
})

test('Add new user with correct values return user object', async ()=>{
    const newUser = await model.addUser(email,name,password)
    expect(newUser).toBeDefined();
    expect(newUser.name).toEqual('testUser');
    expect(newUser.userID).toHaveLength(36)
    expect(newUser.password).toBeDefined()
})
test('Add new user with incorrect email return false', ()=>{
    const isValueCorrect = registrationValidation("",password,password,name)
    expect(isValueCorrect).toBeFalsy()
})
test('Add new user without name return false', ()=>{
    const isValueCorrect = registrationValidation(email,password,password,"     ")
    expect(isValueCorrect).toBeFalsy()
})
test('Add new user with two different passwords return false', ()=>{
    const isValueCorrect = registrationValidation(email,password,"anotherPassword",name)
    expect(isValueCorrect).toBeFalsy()
})
test('Add new user with to short password return false', ()=>{
    const isValueCorrect = registrationValidation(email,"test","test",name)
    expect(isValueCorrect).toBeFalsy()
})

