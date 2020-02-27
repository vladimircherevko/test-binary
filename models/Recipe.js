const { model, Schema } = require("mongoose");

const schema = new Schema({
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  parts: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  history: [
    {
      image: { type: String },
      date: { type: Date },
      title: { type: String },
      text: { type: String },
      parts: { type: String }
    }
  ]
});

module.exports = model("Recipe", schema);
