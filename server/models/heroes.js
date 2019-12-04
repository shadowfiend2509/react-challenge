const { model, Schema } = require('mongoose');

const HeroSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  full: String,
  small: String,
  large: String,
  vertical: String,
  id: Number
})

const Hero = model('heroes', HeroSchema);

module.exports = Hero;