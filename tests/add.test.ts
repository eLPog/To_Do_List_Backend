const {awilixSetup, container} = require('../src/di-setup/containerSetup')



test('getOne task return data from database', async ()=>{
    const cont = await awilixSetup();
    const model = cont.resolve('TaskModel')
    const task = await model.getOne('1d751ebd-9585-4a69-866a-acdf43a9609e')
    expect(task).toBeDefined();
    expect(task).not.toBeNull();
})