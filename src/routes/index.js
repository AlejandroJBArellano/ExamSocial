const express = require("express"),
router = express.Router(),
passport = require("passport"),
indexController = require("../controllers/index"),
isAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) { //lo obtiene passport
        return next();
    } res.redirect("/signin");
};
router.get("/alejandro", indexController.alejandro)
router.get("/signin", (req,res,next)=>{
    if(req.user) {return res.redirect("/feed")}
    res.render("sign/signin", {title: "Iniciar sesión"})
})
router.post("/signin", passport.authenticate("local-signin", {
    title: "Iniciar sesión",
    successRedirect: "/feed",
    failureRedirect: "signin",
    passReqToCallback: true //recibir internamente los datos del request
}))
router.get("/signup", (req,res,next)=>{
    if(req.user) {return res.redirect("/feed")}
    res.render("sign/signup", {title: "regístrate"})
})
router.post("/signup", passport.authenticate("local-signup", {
    title: "Regístrate",
    successRedirect: `/feed`,
    failureRedirect: "signup",
    passReqToCallback: true 
}));
router.get("/", indexController.index)
router.get("/feed", isAuthenticated, indexController.feed)
router.get("/exam", isAuthenticated, indexController.exam)
router.get("/exams/:id", isAuthenticated, indexController.exams)
router.get("/create", isAuthenticated, indexController.create)
router.post("/newExam", isAuthenticated, indexController.newExam)
router.get("/profile/:id", isAuthenticated, indexController.profile)
router.get("/logout", isAuthenticated, (req,res,next)=>{
    req.logout();
    res.redirect("/");
    next();
})
router.get("*", isAuthenticated, indexController.all)

module.exports = router;