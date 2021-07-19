btnForNewQuestion.addEventListener("click", e => {
    e.preventDefault();
    let newQuestionFieldset = document.createElement("fieldset");
    newQuestionFieldset.innerHTML = questionFieldset.innerHTML
    testComplete.insertBefore(newQuestionFieldset, sectionButtons)
    newQuestionFieldset.className = "questionFieldset";
    const arrayClassQuestionFieldset = document.querySelectorAll(".questionFieldset");
    const legendQuestionNumber = (e, i, arr) => {
        e.firstElementChild.innerHTML = `Pregunta ${1+i}`;
    };
    arrayClassQuestionFieldset.forEach(legendQuestionNumber);
    if (arrayClassQuestionFieldset.length >= 2) deleteQuestion.style.display = "inline-block"
    else {deleteQuestion.style.display = "none"}
    if (arrayClassQuestionFieldset.length == 10) {
        alert("ya no puedes crear más preguntas")
        sectionButtons.removeChild(btnForNewQuestion)
    }
});