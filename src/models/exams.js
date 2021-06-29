const mongoose = require("mongoose"), { Schema } = mongoose,

answersSchema = new Schema({
    answer: {
        answer: String,
        correct: Boolean
    },
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
        unique: true,
        required: `The author is required.`
    },
    questions: [questionsSchema]
}, {
    timestamps: true,
});

module.exports = mongoose.model("exams", examSchema);