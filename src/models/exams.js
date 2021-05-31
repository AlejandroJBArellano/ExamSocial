const mongoose = require("mongoose"), { Schema } = mongoose,

examSchema = new Schema({
    title: String, 
    author: { type: Schema.ObjectId, ref: "User" },
    numCuestions: Number,
    cuestions: [{
        cuestion: String, 
        numAnswers: Number, 
        answers: [{
            answerString: String,
            correct: boolean    
        }]
    }]
});