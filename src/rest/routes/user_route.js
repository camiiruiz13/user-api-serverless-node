const UserService = require("../../domain/services/user_service");
const DynamoUserAdapter = require("../../dynamodb/dynamo_user_adapter");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../response/generic_response");
const MessagesResponse = require("../../constants/response_messages");
const ExceptionMessages = require("../../constants/exception_messages");

const userService = new UserService(new DynamoUserAdapter());

class UserRoute {
  async createUser(event) {
    try {
      const data = JSON.parse(event.body);
      const newUser = userService.createUser(data);
      return {
        statusCode: 201,
        body: JSON.stringify(
          new SuccessResponse(MessagesResponse.USER_CREATED, newUser)
        ),
      };
    } catch (error) {
      return this.handlerError(error);
    }
  }

  async getUser(event) {
    try {
      const data = userService.getUsers();
      return {
        statusCode: 200,
        body: JSON.stringify(new SuccessResponse(MessagesResponse.USERS_LIST, data)),
      };
    } catch (error) {
      return this.handlerError(error);
    }
  }

  async updateUser(event) {
    try {
      const userId = event.pathParameters.id;
      const data = JSON.parse(event.body);
      const updatedUser = userService.updateUser(userId, data);
      return {
        statusCode: 200,
        body: JSON.stringify(
          new SuccessResponse(MessagesResponse.USER_UPDATED, updatedUser)
        ),
      };
    } catch (error) {
      return this.handlerError(error);  
    }
  }

  async deleteUser(event) {
    try { 
      const userId = event.pathParameters.id;
      userService.deleteUser(userId);
      return {
        statusCode: 200,
        body: JSON.stringify(new SuccessResponse(MessagesResponse.USER_DELETED)),
      };
    } catch (error) {
      return this.handlerError(error);
    } 
  } 

  async getUserById(event) {
    try {
      const userId = event.pathParameters.id;
      const user = userService.getUserById(userId);
      if (!user) {
        throw new Error(ExceptionMessages.USER_NOT_FOUND);
      }
      return {
        statusCode: 200,
        body: JSON.stringify(new SuccessResponse(MessagesResponse.USER_FOUND, user)),
      };
    } catch (error) {
      return this.handlerError(error);
    } 
  }   

  handlerError(error) {
    console.error("Ha ocurrido un error:", error);
    const statusCode =
      error.message === ExceptionMessages.USER_NOT_FOUND ? 404 : 500;
    return {
      statusCode,
      body: JSON.stringify(new ErrorResponse(error.message, error.stack)),
    };
  }
}

module.exports = UserRoute;
