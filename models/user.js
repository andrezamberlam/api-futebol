const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthdate: { type: mongoose.Schema.Types.Date, required: true }
});
const User = mongoose.model('User', userSchema);


const getUserDB = async userId => {
  try {
    let user = await User.findById(userId);
    return { ...user._doc };
  } catch (error) {
    throw error;
  }
  // return User.findById(userId)
  //   .then(user => { return { ...user._doc }; })
  //   .catch(err => { throw err; });
};

const getUsersDB = async userIds => {
  try {
    let users = await User.find({ _id: { $in: userIds } });
    return users.map(user => { return { ...user._doc }; });
  } catch (error) {
    throw error;
  }

  return User.find({ _id: { $in: userIds } })
    .then(users => { return users.map(user => { return { ...user._doc }; }) })
    .catch(err => { throw err; });
};

module.exports = {
  User,
  userSchema
  // getUserDB,
  // getUsersDB
}