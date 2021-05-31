const express = require("express"),
path = require("path"),
router = require("./routes/index.js"),
morgan = require("morgan"),
engine = require("ejs-mate"),
passport = require("passport"),
flash = require("connect-flash");
const { use } = require("./routes/index.js");
session = require("express-session"),
{ initialize } = require("passport"),

//initializations
app = express();
require("./passport/local-auth") //también ocupa middleware
require("./database")

//static files
app.use(express.static(path.join(__dirname, "public")));

// settings
app.set("views", path.join(__dirname, "views"))
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("port", process.env.PORT || 5000)

//middlewares
// * para saber las peticiones que el usuario hace UwU
app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(session({ //objeto como configuración de esta sesión
    secret: "interface-calculate", //especie de texto secreto para poerd estar seguro *nombre aleatorio
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize()) //usar el módulo inicializar, que lo inicializa
app.use(passport.session()) //archivo dentro del navegador en sesión, y se declara a la vez que se debe de tener el npm i express-session

app.use((req,res,next)=> {
    app.locals.signupMessage = req.flash("signupMessage") //Manda llamar a la variable del local-auth para que la ejecute
    app.locals.signinMessage = req.flash("signinMessage") //Manda llamar a la variable del local-auth para que la ejecute
    app.locals.user = req.user;
    next()//para que continue con el código
})

//routes Ü
app.use(router)

//errors



//starting the server
app.listen(app.get("port"), _=>console.log(`server on port ${app.get("port")}`));