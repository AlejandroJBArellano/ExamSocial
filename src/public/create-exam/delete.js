deleteQuestion.addEventListener("click", e => {
    e.preventDefault()
    const arrayClassQuestionFieldset = document.querySelectorAll(".questionFieldset");
    testComplete.removeChild(arrayClassQuestionFieldset[arrayClassQuestionFieldset.length-1])
})