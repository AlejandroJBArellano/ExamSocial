const testComplete = document.getElementById("testComplete")
const questionFieldset = document.getElementById("questionFieldset")
const btnForNewQuestion = document.getElementById("btnForNewQuestion")
btnForNewQuestion.addEventListener("click", e => {
    e.preventDefault();
    let newQuestionFieldset = document.createElement("fieldset")
    newQuestionFieldset.innerHTML = questionFieldset.innerHTML
    // especificar que se debe poner antes del botón para crear
    testComplete.insertBefore(newQuestionFieldset, btnForNewQuestion)
    newQuestionFieldset.className = "questionFieldset";
    arrayClassQuestionFieldset = document.querySelectorAll(".questionFieldset")
    if (arrayClassQuestionFieldset.length >= 10) {
        alert("ya no puedes crear más preguntas")
        testComplete.removeChild(btnForNewQuestion)
    }
})