const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const solutionSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User",
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
      },
});

const Solution = model("Solution", solutionSchema);

module.exports = Solution;