const isAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) { //lo obtiene passport
        return next();
    } res.redirect("/signin");
};
module.exports = isAuthenticated;