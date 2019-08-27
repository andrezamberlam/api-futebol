const graphql = require('graphql');
const user = require('./queries/user');
const game = require('./queries/game');
const login = require('./queries/login');
//const game = require('./queries/');

const query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {
            user: user.query,
            game: game.query,
            login: login.query
        }
    }
});

const mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            user: user.mutation,
            game: game.mutation
        }
    }
});

module.exports = {
    query,
    mutation
}