const User = require('../models/user');

const registerUser = (user) => {
    return user.save();
}
const getUserByEmail = (email) => {
    return User.findOne({ email });
}
const getUserById = (id) => {
    return User.findOne({ _id: id });
}
const userService = {
    registerUser,
    getUserByEmail,
    getUserById,
}
module.exports = userService;
