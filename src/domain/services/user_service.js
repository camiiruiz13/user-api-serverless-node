const users = require("../entities/users");
const { v4: uuidv4 } = require("uuid");
const ExceptionMessages = require("../../constants/exception_messages");
class UserService {
  getUsers() {
    return users.getAll();
  }
  crateUser(data) {
    const newUser ={
        id: uuidv4(), ...data
    };
    users.users.push(newUser);
    return newUser;
  }
  updateUser(id, data) {
    const userIndex = users.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    users.users[userIndex] = { ...users.users[userIndex], ...data };
    return users.users[userIndex];
  }
}
