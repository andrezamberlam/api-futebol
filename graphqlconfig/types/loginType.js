const createType = require('mongoose-schema-to-graphql');
const { User, userSchema } = require('../../models/user');
const graphql = require('graphql');
const utils = require('../../utils/utils');
const enums = require('../../utils/enums');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    tokenExpiration: { type: Number , required: true },
    userId: { type: mongoose.ObjectId, required: true }
}, { _id: false });



const config = {
    name: 'loginType',
    description: 'LoginType',
    class: 'GraphQLObjectType',
    schema: loginSchema,
    exclude: ['password', 'email']
};


const configInput = {
    name: 'loginInputType',
    description: 'InputType Login',
    class: 'GraphQLInputObjectType',
    schema: loginSchema,
    exclude: ['token', 'tokenExpiration', 'userId']
};

module.exports = {
    type: createType(config),
    inputType: createType(configInput)
};
