const graphql = require('graphql');
const userType = require('../../types/userType');
const { User, userSchema } = require('../../../models/user');



const query = {
  type: new graphql.GraphQLList(userType.type),
  // `args` describes the arguments that the `user` query accepts
  args: {
    input: {
      type: userType.inputType
    }
  },
  resolve: async () => {
    try {
      let users = await User.find();
      return users.map(user => { return { ...user._doc }; });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = query;
