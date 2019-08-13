const graphql = require('graphql');
const gameType = require('../../types/gameType');
const { Game, gameSchema } = require('../../../models/game');
const User = require('../../../models/user');



const query = {
  type: new graphql.GraphQLList(gameType.type),
  // `args` describes the arguments that the `game` query accepts
  args: {
    input: { type: gameType.inputType }
  },
  resolve: async () => {
    try {
      let games = await Game.find(/*{ _id: "5d310f15710db63520579439" }*/).populate('createdBy').populate('players.user');
      return games.map(game => {
        return { ...game._doc };
      });
    } catch (err) {
      throw err;
    }
    /* VELHO
    // .populate({
    //   path: 'players.user' //--,
    //   // Get friends of friends - populate the 'friends' array for every friend
    //   //populate: { path: 'players' }
    // })
    //.then(games => {
    return await games.map(game => {
      // let players = game.players.map(player => {
      //   return player.user;
      // });
      //console.log(players);

      // let promisePlayers = User.getUsersDB(players);
      // return promisePlayers.then(gamePlayersBD => {
      // game._doc.players = game._doc.players.map(playerDoc => {
      //   // let playerPositionU = { position: playerDoc.position, user: gamePlayersBD.find((thiss) => { return thiss._id.equals(playerDoc.user._id); }) };
      //   // playerPositionU.user._id = playerPositionU.user._id.toString();
      //   // return playerPositionU;
      //   return { position: playerDoc.position, user: gamePlayersBD.find((thiss) => { return thiss._id.equals(playerDoc.user._id); }) };
      //   return playerDoc.user = gamePlayersBD.find((thiss) => { return thiss._id.equals(playerDoc.user._id); });
      //   return playerDoc; saad
      // });
      return {
        ...game._doc
        // createdBy: User.getUserDB.bind(this, game.createdBy)
        // players: [{
        //   user: User.getUsersDB.bind(this, game.players),
        //   position: game._doc
        // }]//User.getUsersDB.bind(this, game.players)
      };
      // }).catch(err => {
      //   console.log('err');
      //   throw err;
      // });
      //console.log(User.getUsersDB.bind(this, players));
      //console.log(players);

    });*/
    // }).catch(err => {
    //   console.log('err');
    //   throw err;
    // });
  }
};

module.exports = query;
