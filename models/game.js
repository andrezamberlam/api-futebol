const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerPositionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', },
  position: { type: Number, required: true }
}, { _id: false });

const gameSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{
    user: { type: Schema.Types.ObjectId, ref: 'User', },
    position: { type: Number, required: true }
  }]
});

// gameSchema.pre('find', function() {
//   this.populate('createdBy');
// });

module.exports = {
  Game: mongoose.model('Game', gameSchema),
  gameSchema,
  playerPositionSchema
}
