const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  comment: { type: String, required: true },
  description: { type: String },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    autopopulate: true
  }
});

commentSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('comment', commentSchema);