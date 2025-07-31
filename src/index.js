const UserRoute = require('./rest/responses/user_route');
module.exports.createUser = async (event) => {
  return userRoute.createUser(event);
};

module.exports.getUser = async (event) => {
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