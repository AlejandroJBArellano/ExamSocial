const passport = require("passport"),
User = require("../models/user"),
Exam = require("../models/exams"),
validator = require("validator"),
hasItUsername = async (req, res) => {
    if(req.user) {
        const user = await User.findById(req.user)
        if(!user.username || !user.picture){
            res.redirect("/createUsername")
        } res.redirect("/feed")
    }
}, hasItUsernameTwo = async (req, res) => {
    console.log(req.user)
    if(req.user) {
        const user = await User.findById(req.user)
        if(!user.username || !user.picture){
            res.redirect("/createUsername")
        }
    }
};

const all = (req, res) => {
    hasItUsername(req,res)
},
getViewUsername = (req, res) => {
    hasItUsernameTwo(req, res)
    res.render("createUsername/index")
},
createUsername = async (req, res) => {
    console.log(req.body)
    const user = await User.findById(req.user)
    if(validator.isLength(req.body.username, {min: 5, max: 25}) && req.body.picture === "picTwo" || req.body.picture === "picOne"){
        user.username = req.body.username;
        user.picture = `/multimedia/picture/${req.body.picture}.png`;
        await user.save()
        res.redirect("/")
    } {req.flash("userLength"), "Tu puede tener un máximo de 25 carácteres y un mínimo de 5"}
},
index = (req, res) => {
    if(req.user) {
        return res.redirect("/feed")
    } {
        return res.render("index", {
            title: "ExamSocial - Red Social de Pruebas"
        })
    }
},
feed = async (req,res) => {
    hasItUsernameTwo(req,res)
    const user = await User.findById(req.user);
    const exams = await Exam.find()
    const users = await User.find(exams.author)
    return res.render("feed", {
        title: "Lo último en ExamSocial",
        exams: exams,
        authors: users,
        id: user._id
    })
},
exam = async (req,res)=>{
    hasItUsernameTwo(req,res)
    const user = await User.findById(req.user);
    res.render("exam/exam", {
        title: "Exam de prueba",
        id: user._id
    })
},
exams = async (req,res)=>{
    hasItUsernameTwo(req,res)
    const exam = await Exam.findById(req.params.id)
    const author = await User.findById(exam.author)
    const user = await User.findById(req.user) 
    res.render(`exams/exams`, {
        id: user._id,
        exam: exam, //preguntar si es lo mismo exam: exam y me salto todo lo demás
        title: exam.title,
        author: author.email,
        createdAt: exam.createdAt,
        questions: exam.questions,
        usersDone: exam.usersDone
    })
},
create = async (req, res)=>{
    hasItUsernameTwo(req,res)
    const user = await User.findById(req.user)
    res.render("create/createQyA", {
        title: "Crea tu examen",
        user: user
    })
},
profile = async (req, res) =>{
    hasItUsernameTwo(req,res)
    const user = await User.findById(req.user), userToFind = await User.findById(req.params.id);
    // const arrayExams = await Exam.findMany(userTofind.exams) BUSCAR LOS PARÁMETROS DE FINDMANY PARA SABER COMO SACAR EL TÍTULO DE LOS EXÁMENES Y MOSTRÁRSELOS AL USUARIO
    res.render("profile", {
        title: "Tu perfil de ExamSocial",
        host: "http://localhost:5000",
        userToFind: userToFind,
        user: user,
        email: userToFind.email,
        createdAt: userToFind.createdAt,
        id: user._id
    })
},
newExam = async (req, res)=>{
    hasItUsernameTwo(req,res)
    const user = await User.findById(req.user),
    examData = JSON.parse(req.body.deepFormJSON),
    newExam = new Exam(examData);
    console.log(examData);
    newExam.title = examData.title
    newExam.author = user._id
    newExam.questions = []
    examData.questions.question.forEach(e => {
        newExam.questions.push({
            question: e,
        })
    })
    examData.questions.answers.answer.forEach(e => {

    })
    for(var i = 0; i < examData.questions.answers.answer.length; i++){
        examData.questions.answers.answer[i] = newExam.questions.answers.answer[i]
    }
    examData.questions.answers.correct.forEach(e => {

    })
    await newExam.save();
    user.exams.push(newExam._id)
    res.redirect("/")
},
deleteExam = async (req, res) => {
    hasItUsernameTwo(req,res)
    const user = await User.findById(req.user)
    const { idExam } = req.params;
    await Exam.remove({_id: idExam})
},
completeExam = async (req, res) => {
    hasItUsernameTwo(req,res)
    const user = await User.findById(req.user)
    const { id } = req.params;
    const examCompleted = Exam.findById(id);
    user.examsDone.push(examCompleted._id)
    examCompleted.usersDone.push(user._id)
},
alejandro = (req,res)=>{
    res.render(`author/alejandro`)
};
module.exports = {
    all, 
    index,
    getViewUsername,
    createUsername, 
    exams, 
    alejandro, 
    create, 
    profile, 
    exam, 
    feed, 
    newExam, 
    deleteExam, 
    completeExam
}