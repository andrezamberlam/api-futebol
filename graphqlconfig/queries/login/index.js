const graphql = require('graphql');
const loginType = require('../../types/loginType');
const { User, userSchema } = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const query = {
    type: loginType.type,
    // `args` describes the arguments that the `user` query accepts
    args: {
        input: {
            type: loginType.inputType
        }
    },
    resolve: async (value, { input }) => {
        try {
            if (!input.email || !input.password)
                throw new Error('Email ou senha não informado.');

            const user = await User.findOne({ email: input.email });
            if (!user)
                throw new Error('Usuário não encontrado.');

            const isEqual = await bcrypt.compare(input.password, user.password);
            if (!isEqual) {
                throw new Error('Senha incorreta.');
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, 'senhaSUPERsecreta@@@@@@@@@@@@@@@@@@@@', {
                expiresIn: '1h'
            });

            return { userId: user.id, token: token, tokenExpiration: 1 };
            //return users.map(user => { return { ...user._doc }; });
        } catch (err) {
            throw err;
        }
    }
};



module.exports = {
    query
}
