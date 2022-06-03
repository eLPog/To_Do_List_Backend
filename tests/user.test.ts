import {awilixSetup} from "../src/di-setup/containerSetup";
import db from "../src/db/dbConnection";
import UserModel from "../src/models/userModel";

let cont:any;
let model:UserModel;
let register:any;
let userID:string;
let email = 'test@test.test';
let name = 'testUser';
let password = 'password';
beforeAll(async()=>{
    cont = await awilixSetup();
    model= cont.resolve('UserModel')
    register = cont.resolve('AuthenticationModel')
    const newUser = await register.addUser(email,name,password)
    userID = newUser.userID
})

afterAll(async()=>{
    await db.execute('DELETE FROM users WHERE userID=:userID', {
        userID
    })
    await db.end()
})

test('Get user by email return this user', async ()=>{
    const user = await model.getUser(email)
    expect(user).toBeDefined()
    expect(user.email).toEqual(email)
    expect(typeof user.name).toBe('string')
})

test('Get user by email that does not exist return false', async ()=>{
    const user = await model.getUser("xxx")
    expect(user).not.toBeDefined()

})
test('Edit user return user with edited values', async()=>{
    const isUserEdited = await model.editUser(email,{name:'NewTesterName',password,email})
    const editedUser = await model.getUser(email)
    expect(isUserEdited).toEqual(true)
    expect(editedUser.name).toEqual('NewTesterName')
    expect(editedUser.password).toEqual(password)
    expect(editedUser.email).toEqual(email)
})
test('Delete user by email return true', async ()=>{
    const isUserDeleted = await model.deleteUser(email)
    expect(isUserDeleted).toBeDefined()
    expect(isUserDeleted).toEqual(true)

})
