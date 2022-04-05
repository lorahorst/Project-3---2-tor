const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const homeworkSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
     author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      solutions: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: "Solution",
      },
});

const Homework = model("Homework", homeworkSchema);

module.exports = Homework;