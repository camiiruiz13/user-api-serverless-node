const users = require("../entities/users");
const { v4: uuidv4 } = require("uuid");
const ExceptionMessages = require("../../constants/exception_messages");

class UserService {
  getUsers() {
    return users.getAll();
  }
  createUser(data) {
    const newUser ={
        id: uuidv4(), ...data
    };
    users.users.push(newUser);
    return newUser;
  }
  updateUser(id, data) {
    const userIndex = users.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error(ExceptionMessages.USER_NOT_FOUND);
    }
    users.users[userIndex] = { ...users.users[userIndex], ...data };
    return users.users[userIndex];
  }

    deleteUser(id) {
        const userIndex = users.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
        throw new Error(ExceptionMessages.USER_NOT_FOUND);
        }
        const deletedUser = users.users.splice(userIndex, 1);
        return deletedUser[0];
    }
    getUserById(id) {
        const user = users.users.find(user => user.id === id);
        if (!user) {
            throw new Error(ExceptionMessages.USER_NOT_FOUND);
        }
        return user;
    }
}
module.exports = UserService;