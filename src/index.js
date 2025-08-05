const UserRoute = require('./rest/routes/user_route');
const userRoute = new UserRoute();


module.exports.createUser = async (event) => {
  return userRoute.createUser(event);
};

module.exports.getUsers= async (event) => {
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