//npm modules

const passport = require("passport"),
User = require("../models/user")
Exam = require("../models/exams");

const all = (req, res) => {
    if(req.user) {return res.redirect("/feed")}
},
index = (req, res) => {
    if(req.user) {return res.redirect("/feed")}
    res.render("index", {
        title: "ExamSocial - Red Social de Pruebas"
    })
},
feed = async (req,res) => {
    const user = await User.findById(req.user);
    const exams = await Exam.find()
    return res.render("feed", {
        title: "Lo último en ExamSocial",
        exams: exams,
        id: user._id
    })
},
exam = async (req,res)=>{
    const user = await User.findById(req.user);
    res.render("exam/exam", {
        title: "Exam de prueba",
        id: user._id
    })
},
exams = async (req,res)=>{
    const exam = await Exam.findById(req.params.id)
    const user = await User.findById(req.user) 
    res.render(`exams`, {
        exam: exam, //preguntar si es lo mismo exam: exam y me salto todo lo demás
        title: exam.title,
        author: exam.author,
        questions: exam.questions,
        usersDone: exam.usersDone
    })
},
create = async (req, res)=>{
    const user = await User.findById(req.user)
    res.render("create/createQyA", {
        title: "Crea tu examen",
        user: user
    })
},
profile = async (req, res) =>{
    const user = await User.findById(req.user)
    res.render("profile", {
        title: "Tu perfil de ExamSocial",
        email: user.email,
        createdAt: user.createdAt,
        id: user._id
    })
},
newExam = async (req, res)=>{
    const user = await User.findById(req.user)
    console.log(req.body);
    const newExam = new Exam(req.body)
    await newExam.save();
    res.redirect("/")
},
deleteExam = async (req, res) => {
    const user = await User.findById(req.user)
    const { idExam } = req.params;
    await Task.remove({_id: idExam})
},
completeExam = async (req, res) => {
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