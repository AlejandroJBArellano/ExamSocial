const mongoose = require("mongoose"), { Schema } = mongoose,

answersSchema = new Schema({
    answer: String,
    correct: Boolean
}),

questionsSchema = new Schema({
    question: {
        type: String,
        required: "The questions are required, hacker."
    },
    answers: [answersSchema]
}),

examSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    author: { 
        type: Schema.ObjectId, 
        ref: "User",
        required: `The author is required.`
    },
    questions: [questionsSchema],
    usersDone: [{
        type: Schema.ObjectId, 
        ref: "User",
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("Exam", examSchema);