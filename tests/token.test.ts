import {awilixSetup} from "../src/di-setup/containerSetup";
import db from "../src/db/dbConnection"

let token:string;
let cont:any;
let model:any;

beforeAll(async()=>{
    token = 'testToken123456789';
    cont = await awilixSetup();
    model = cont.resolve('TokenModel');
})

afterAll(async()=>{
    await db.execute('DELETE FROM tokens WHERE token LIKE :tokenString',{
        tokenString:'testToken%'
    })
    db.end()
});

test('Create new token return true', async ()=>{
    const newToken = await model.addToken(token)
    expect(newToken).toBeDefined()
    expect(newToken).toBeTruthy()
});
test('Create new token return true', async ()=>{
    const newToken = await model.addToken(token)
    expect(newToken).toBeDefined()
    expect(newToken).toBeTruthy()
});

test('Get all tokens return array with tokens', async ()=>{
    await model.addToken(token)
    await model.addToken(token + '11')
    await model.addToken(token + '12')
    await model.addToken(token + '13')
    const tokens = await model.getTokens()
    expect(typeof tokens).toBe('object')
    expect(tokens.length).toBeGreaterThan(3)
})

test('Delete existing token return true',async ()=>{
     await model.addToken(token)
    const res = await model.deleteToken(token)
expect(res).toBe(true)
})

