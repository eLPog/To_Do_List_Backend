import {awilixSetup} from "../src/di-setup/containerSetup";
import db from "../src/db/dbConnection"
let cont:any;
let model:any;
let register:any;
let email = 'test@tester.com';
let name = 'testUser';
let password = 'password';
let userID:string;
beforeAll(async()=>{
    cont = await awilixSetup();
    model = cont.resolve('TaskModel')
    register = cont.resolve('AuthenticationModel')
    const newUser = await register.addUser(email,name,password)
    userID = newUser.userID
})
afterAll(async()=>{
   await db.execute('DELETE FROM tasks WHERE content LIKE :testString',
        {testString: "test%"})
    await db.execute('DELETE FROM users WHERE userID=:userID', {
        userID
    })
    await db.end()
})
test('getOne task return data from database', async ()=>{
    const newTask = await model.add('testTitle','test',userID)
    const task = await model.getOne(newTask.taskID)
    expect(task).toBeDefined();
    expect(task.title).toEqual('testTitle');
    expect(task).not.toBeNull();
})

test('getOne task return false from database when id doesnt exist ', async()=>{
    const task = await model.getOne('xxxxxxxxxxxxxxxx')
    expect(task).not.toBeDefined();
    expect(task).toBeFalsy();
})
test('getOne task return false from database when id is not passed ', async()=>{
    const task = await model.getOne('')
    expect(task).not.toBeDefined();
    expect(task).toBeFalsy();
})

test('get all tasks from db from one user returns array', async ()=>{
    const task = await model.getAll(userID)
    expect(task).toBeDefined()
    expect(task).not.toBeNull()
    expect(task).not.toEqual([])
})

test('get all users tasks if user do not exist returns empty array ', async ()=>{
    const task = await model.getAll('xxxxx')
    expect(task).toEqual([])
})

test('add new task to db return this task', async()=>{
    const newTask = {
        title:"testTitle",
        content:"test",
        userID:userID
    }
    const task = await model.add(newTask.title, newTask.content, newTask.userID)
    expect(task).toBeDefined()
    expect(task.content).toBe("test")
    expect(task.taskID).not.toEqual([])
    expect(task.taskID).not.toEqual({})

})

test('add new task if userID does not exist return false', async()=>{
    const task = await model.add('titleTest','test','xxx')
    expect(task).toBeFalsy();
})

test('delete task if taskID does not exit return false', async ()=>{
    const task = await model.deleteOne('xxx')
    expect(task).toBeFalsy()
})
test('delete task return true', async ()=>{
    const newTask = await model.add('testTitle', 'test123',userID)
    const task = await model.deleteOne(newTask.taskID)
    expect(task).toBeTruthy()
})

test('delete all tasks return true', async ()=>{
    await model.add('testTitle', 'test1',userID)
    await model.add('testTitle', 'test2',userID)
    const task = await model.deleteAll(userID)
    expect(task).toBeTruthy()
})
test('update task return updated task', async()=>{
    const newTask = await model.add('testTitle', 'test1', userID)
    const updatedTask = await model.updateTask(newTask.taskID, {title:'newTestTitle',content:'test2'})
    expect(updatedTask).toBeDefined()
    expect(updatedTask.title).toEqual('newTestTitle')
    expect(updatedTask.content).toEqual('test2')
    expect(updatedTask.taskID).toEqual(newTask.taskID)
})

