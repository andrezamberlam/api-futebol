const createType = require('mongoose-schema-to-graphql');
const { Game, gameSchema, playerPositionSchema } = require('../../models/game');
const User = require('./userType');
const graphql = require('graphql');
const utils = require('../../utils/utils');
const enums = require('../../utils/enums');


const playerPositionType = createType({
    name: 'playerPositionType',
    description: 'PlayerPositionType',
    class: 'GraphQLObjectType',
    schema: playerPositionSchema,
    extend: {
        user: { type: User.type },
    },
    exclude: ['__v']
});

const playerPositionTypeInput = createType({
    name: 'PlayerPositionInputType',
    description: 'PlayerPositionInputType',
    class: 'GraphQLInputObjectType',
    schema: playerPositionSchema,
    exclude: ['__v']
});

const config = {
    name: 'gameType',
    description: 'GameType',
    class: 'GraphQLObjectType',
    schema: gameSchema,
    extend: {
        createdBy: { type: User.type },
        players: { type: new graphql.GraphQLList(playerPositionType) }
        //players: { type: playerPositionType }
    },
    exclude: ['__v']
};

const configInput = {
    name: 'gameInputType',
    description: 'InputType Game',
    class: 'GraphQLInputObjectType',
    schema: gameSchema,
    exclude: ['__v']
};

const configInputMutation = {
    name: 'gameInputTypeMutation',
    description: 'InputType Game',
    class: 'GraphQLInputObjectType',
    schema: gameSchema,
    extend: {
        mutationType: {
            type: new graphql.GraphQLEnumType({
                name: 'gameEnumMutationType_ADD_UPDATE_DELETE',
                values: utils.jsEnumToGraphQlEnum(enums.mutationType)
            })
        },
        //players: { type: new graphql.GraphQLList(playerPositionTypeInput) }
    },
    exclude: ['__v']
};

module.exports = {
    type: createType(config),
    inputType: createType(configInput),
    inputTypeMutation: createType(configInputMutation)
};
