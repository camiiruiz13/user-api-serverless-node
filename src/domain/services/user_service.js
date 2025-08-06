const { v4: uuidv4 } = require("uuid");
const ExceptionMessages = require("../../constants/exception_messages");

class UserService {
  constructor(userAdapter) {
    this.userAdapter = userAdapter;
  }

  async getUsers() {
    return await this.userAdapter.getAllUsers();
  }

  async createUser(data) {
    const newUser = {
      id: uuidv4(),
      ...data,
    };
    return await this.userAdapter.createUser(newUser);
  }

  async updateUser(id, data) {
    const existing = await this.userAdapter.getUserById(id);
    if (!existing) {
      throw new Error(ExceptionMessages.USER_NOT_FOUND);
    }
    return await this.userAdapter.updateUser(id, data);
  }

  async deleteUser(id) {
    const existing = await this.userAdapter.getUserById(id);
    if (!existing) {
      throw new Error(ExceptionMessages.USER_NOT_FOUND);
    }
    return await this.userAdapter.deleteUser(id);
  }

  async getUserById(id) {
    const user = await this.userAdapter.getUserById(id);
    if (!user) {
      throw new Error(ExceptionMessages.USER_NOT_FOUND);
    }
    return user;
  }
}

module.exports = UserService;
