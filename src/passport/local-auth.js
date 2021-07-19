const passport = require("passport"), LocalStrategy = require("passport-local").Strategy, User = require("../models/user"), validator = require("validator");

//serializar al usuario; no pedirle que inicie sesión cada vez que pida algo a nuestra aplicación
passport.serializeUser((user, done)=>{
    done(null, user.id); //se va a estar intercambiando entre múltiples páginas
});
passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id)
    done(null, user.id); //consulta para ver que exista en la base de datos, como existe, se declara null
})

// 1er pa´ramteo: nombre de autenticación; 2do, la nueva estrategia. A su ve, el 2do; el 1ero es de configuración y el 2do de ejecución
passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // recibe también los datos request
}, async (req, email, password, done) => { //el done es la respuesta finalizada para el cliente
    if(validator.isEmail(email) && validator.isLength(password, {min: 5, max: 25})){
        const validateUser = await User.findOne({email: email})    //validacion de la existencia del usuario
        if (validateUser) {return done(null, false, req.flash("signupMessage", "Este Usuario ya ha sido registrado"))} //para buscar correos existentes
        else{
            const newUser = new User(); // el ususario es blanco; sin datos, por eso se especifica los datos nuevos
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password); //toma como parámetro la contraseña, la cifra y al momento de retornarla se le asigna
            await newUser.save(); // método asíncrono; await debe de tener async en su función padre
            done(null, newUser); //termina el proceso de registro; 1er parámetro es igual a error, donde se pone null porque se desconoce; el 2do es éxito, un usuario registrado
        }
    } {return done(null, false, req.flash("signupMessage", "Campos inválidos; la contraseña debe tener mínimo 5 carácteres"))}
}));

passport.use("local-signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // recibe también los datos request
}, async (req, email, password, done) => { //el done es la respuesta finalizada para el cliente

    const user = await User.findOne({email: email})
    if(!user){return done(null, false, req.flash("signinMessage", "El email y la contraseña no coinciden"))}
    if(!user.comparePassword(password)){return done(null, false, req.flash("signinMessage", "El email y la contraseña no coinciden"))}
    done(null, user)
}));