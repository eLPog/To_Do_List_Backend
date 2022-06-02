import {awilixSetup} from "../src/di-setup/containerSetup";
import db from "../src/db/dbConnection"
let cont:any;
let model:any
beforeAll(async()=>{
    cont = await awilixSetup();
    model = cont.resolve('TaskModel')
})
afterAll(async()=>{
    await db.end()
})
test('getOne task return data from database', async ()=>{
    const task = await model.getOne('1d751ebd-9585-4a69-866a-acdf43a9609e')
    expect(task).toBeDefined();
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
    const task = await model.getAll('c7423818-0c8f-43eb-98a2-367fafebc66e')
    expect(task).toBeDefined()
    expect(task).not.toBeNull()
    expect(task).not.toEqual([])
})

test('get all users tasks if user do not exist returns empty array ', async ()=>{
    const task = await model.getAll('xxxxx')
    expect(task).toEqual([])
})




