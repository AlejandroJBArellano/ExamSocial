const answerSchema = {
    answer: "",
    correct: Boolean
}

const arrayAnswers = [], arrayQuestions = [];

const questionSchema = {
    question: "",
    answers: arrayAnswers
}

answerFieldset.forEach(e => {
    const answer = e.children[0].value
    const correct = e.children[1][0].value

    arrayAnswers.push({ answer, correct })
})

questionFieldsetArray.forEach(e => {
    const question = e.children[1].value
    const answers = arrayAnswers

    arrayQuestions({ question, answers })
})

const payload = {
    title: "", 
    author: "",
    questions: arrayQuestions
}