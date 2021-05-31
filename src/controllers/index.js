const index = (req, res) =>{
    res.render("index", {
        title: "ExamSocial - Red Social de Pruebas"
    })
},
exams = (req,res)=>res.render(`exams`, {
    title: "ExamSocial",
    items: items
}),
create = (req, res, next)=>res.render("create", {
    title: "Crea tu examen",
}), 
profile = (req, res) =>res.render("profile", {
    title: "tu perfil de ExamSocial",
}),
alejandro = (req,res)=>res.render(`alejandro`, {title: "Alejandro Full Stack Developer"});
// newProduct = (req,res,next)=>{
//     console.log(req.body);
//     const { newItem } = req.body;
//     console.log("false");
//     items.push({
//         id: items.length + 1,
//         name: newItem
//     });
//     res.redirect("/exams")
// };
module.exports = {
    index, exams, alejandro, create, profile
}