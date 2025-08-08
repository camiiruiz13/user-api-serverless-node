const { v4: uuidv4 } = require("uuid");
const ExceptionMessages = require("../../constants/exception_messages");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return await this.userRepository.getAllUsers();
  }

  async createUser(data) {
    const newUser = {
      id: uuidv4(),
      ...data,
    };
    return await this.userRepository.saveUser(newUser);
  }

  async updateUser(id, data) {
    const existing = await this.userRepository.getUserById(id);
    if (!existing) {
      throw new Error(ExceptionMessages.USER_NOT_FOUND);
    }
    return await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id) {
    const existing = await this.userRepository.getUserById(id);
    if (!existing) {
      throw new Error(ExceptionMessages.USER_NOT_FOUND);
    }
    return await this.userRepository.deleteUser(id);
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error(ExceptionMessages.USER_NOT_FOUND);
    }
    return user;
  }
}

module.exports = UserService;
