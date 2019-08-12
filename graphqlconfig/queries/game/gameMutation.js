const graphql = require('graphql');
const gameType = require('../../types/gameType');
const { Game, gameSchema } = require('../../../models/game');
const enums = require('../../../utils/enums');

const mutation = {
  type: new graphql.GraphQLList(gameType.type),
  args: {
    input: {
      type: new graphql.GraphQLList(gameType.inputTypeMutation)
    }
  },
  resolve: (value, { input }) => {
    return new Promise((resolve, reject) => {
      let promisesGames = input.map(async inputGame => {
        switch (inputGame.mutationType) {
          case enums.mutationType.ADD:
            return addGame(inputGame)
              .then(result => {
                return result;
              })
              .catch(err => {
                return err;
              });;
          case enums.mutationType.UPDATE:
            updateGame(inputGame);
            break;
          case enums.mutationType.DELETE:
            deleteGame(inputGame);
            break;
          default:
            return new Error('Opa! Não encontramos a operação para um usuario.');
        }
      });

      Promise.all(promisesGames).then((results) => {
        let resultado = [];
        let erros = [];
        results.map(async resultGame => {
          if (!!resultGame.errors)
            erros.push(resultGame.errors);
          resultado.push(resultGame);
        });
        if (erros.length > 0)
          reject(erros);
        else
          resolve(resultado);
      })
        .catch((err) => { return err });
    });
  }
};

let addGame = (gameAdd) => {
  console.log(gameAdd.players);

  const game = new Game(gameAdd);
  //console.log(game);
  return game
    .save()
    .then(result => {
      return { ...result._doc };
    })
    .catch(err => {
      return err;
    });
};

const updateGame = (gameAdd) => {
  console.log('update essa porra ai', gameAdd);
};

const deleteGame = (gameAdd) => {
  console.log('deleta essa porra ai', gameAdd);
};

module.exports = mutation;          