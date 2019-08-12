const createType = require('mongoose-schema-to-graphql');
const { User, userSchema } = require('../../models/user');
const graphql = require('graphql');
const utils = require('../../utils/utils');
const enums = require('../../utils/enums');

const config = {
    name: 'userType',
    description: 'UserType',
    class: 'GraphQLObjectType',
    schema: userSchema,
    exclude: ['__v','password']
};


const configInput = {
    name: 'userInputType',
    description: 'InputType User',
    class: 'GraphQLInputObjectType',
    schema: userSchema,
    exclude: ['__v']
};

const configInputMutation = {
    name: 'userInputTypeMutation',
    description: 'InputType User',
    class: 'GraphQLInputObjectType',
    schema: userSchema,
    extend: {
        mutationType: {
            type: new graphql.GraphQLEnumType({
                name: 'userEnumMutationType_ADD_UPDATE_DELETE',
                values: utils.jsEnumToGraphQlEnum(enums.mutationType)
            })
        }
    },
    exclude: ['__v']
};

module.exports = {
    type: createType(config),
    inputType: createType(configInput),
    inputTypeMutation: createType(configInputMutation)
};
