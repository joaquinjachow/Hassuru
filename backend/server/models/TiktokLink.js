const mongoose = require('mongoose');

const TiktokLinkSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TiktokLink', TiktokLinkSchema);
