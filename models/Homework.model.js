const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const homeworkSchema = new Schema({
    content: {
        type: String,
        required: true,
    }
});

const Homework = model("Homework", homeworkSchema);

module.exports = Homework;