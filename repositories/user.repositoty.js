const {read, write} = require('../services/fs.service');
class UserRepositoty {
    async getAll(){
        return read();
    }
    async getById(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        if(index > -1) return users[index];
        else return {}
    }
    async create(user){
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name:user.name,
            surname: user.surname,
            age: user.age,
        }
        users.push(newUser);
        await write(users);
        return newUser;
    }
    async delete(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        if(index > -1) {
            users.splice(index, 1);
            await write(users);
            return 1;
        }
        else return -1;
    }
    async update(id, user){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        if(index > -1) {
            user.id=Number(id);
            users[index] = user;
            await write(users);
            return users[index];
        }
    }
}

const userRepository = new UserRepositoty();
module.exports = {
    userRepository
};