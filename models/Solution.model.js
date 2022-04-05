const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const solutionSchema = new Schema({
    content: {
        type: String,
        required: true,
    }
});

const Solution = model("Solution", solutionSchema);

module.exports = Solution;