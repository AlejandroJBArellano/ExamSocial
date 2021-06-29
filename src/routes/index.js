const express = require("express"),
router = express.Router(),
passport = require("passport"),
indexController = require("../controllers/index"),
isAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) { //lo obtiene passport
        return next()
    } res.redirect("/signin")
};
router.get("/signin", (req,res,next)=>res.render("sign/signin", {title: "Iniciar sesión"}))
router.post("/signin", passport.authenticate("local-signin", {
    title: "Iniciar sesión",
    successRedirect: "/feed",
    failureRedirect: "signin",
    passReqToCallback: true //recibir internamente los datos del request
}))
router.get("/signup", (req,res,next)=>res.render("sign/signup", {title: "regístrate"}))
router.post("/signup", passport.authenticate("local-signup", {
    title: "Regístrate",
    successRedirect: `/feed`,
    failureRedirect: "signup",
    passReqToCallback: true 
}));
router.get("/", indexController.index)
router.use((req, res, next)=>{ //las rutas siguientes ocupan validación de usuarios para poder acceder a ellas
    isAuthenticated(req,res,next);
    next()
})
router.get("/", indexController.feed)
router.get("/exam", indexController.exam)
router.get("/exams",indexController.exams)
router.get("/alejandro", indexController.alejandro)
router.get("/create", indexController.create)
router.post("/newExam", indexController.newExam)
router.get("/profile/:id", indexController.profile)
router.get("/logout", (req,res,next)=>{
    req.logout();
    res.redirect("/");
    next();
})

module.exports = router;