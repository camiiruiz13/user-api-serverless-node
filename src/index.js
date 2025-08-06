const UserRoute = require('./rest/routes/user_route');
const UserService = require('./domain/services/user_service');
const DynamoUserAdapter = require('./dynamodb/dynamo_user_adapter');


const userAdapter = new DynamoUserAdapter();
const userService = new UserService(userAdapter);
const userRoute = new UserRoute(userService);

module.exports.createUser = async (event) => {
  return userRoute.createUser(event);
};

module.exports.getUsers = async (event) => {
  return userRoute.getUser(event);
};

module.exports.updateUser = async (event) => {
  return userRoute.updateUser(event);
};

module.exports.deleteUser = async (event) => {
  return userRoute.deleteUser(event);
};

module.exports.getUserById = async (event) => {
  return userRoute.getUserById(event);
};