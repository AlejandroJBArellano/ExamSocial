//npm modules

const passport = require("passport"),
User = require("../models/user")
Exam = require("../models/exams");

const index = (req, res) =>{
    console.log(req.user)
    res.render("index", {
        title: "ExamSocial - Red Social de Pruebas"
    })
},
feed = async (req,res)=>{
    try{
        const user = await User.findById(req.user);
        return res.render("feed", {
        title: "Lo último en ExamSocial",
        email: user.email
        })
    } catch (e) {
        return res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
},
exam = (req,res)=>res.render("exam", {
    title: "Exam de prueba"
}),
exams = (req,res)=>res.render(`exams`, {
    title: "ExamSocial",
}),
create = (req, res)=>{
    res.render("create/createQyA", {
        title: "Crea tu examen",
    })
},
profile = async (req, res) =>{
    user = await User.findById(req.user)
    res.render("profile", {
    title: "tu perfil de ExamSocial",
    user: user,
    // email: user.email.type,
    // createdAt: user.createdAt
    })
},
newExam = async (req, res)=>{
    //lo que puedo hacer es seprar diferentes tablas dependiendo de los exámenes
    console.log(req.body);
    const newExam = new Exam(req.body);
    newExam.author = User
    await newExam.save();
    res.redirect("/")
},
alejandro = (req,res)=>{
    res.render(`alejandro`, {title: "Alejandro Full Stack Developer"})
};
module.exports = {
    index, exams, alejandro, create, profile, exam, feed, newExam
}