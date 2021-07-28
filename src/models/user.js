// guardar esquemas en mongús
const mongoose = require("mongoose"), { Schema } = mongoose, bcrypt = require("bcrypt")

userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    picture: String,
    password: String, //la contraseña no se almacena en texto plano XD, pa eso se uba bcrypt
    exams: [{ type: Schema.ObjectId, ref: "Exam" }],
    examsDone: [{ type: Schema.ObjectId, ref: "Exam", aciertos: Number }]
}, {
    timestamps: true
});

//definición de métodos de cifrados

userSchema.methods.encryptPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
    //hasSync recibe el texto y lo encripta Ü; más veces, más cifrado. genSaltSync hace el decifrado cteniendo como parámetro el númerp de veces a decifrar 
};
// el return es para que me retorne ese valor y no simplemente me lo haga

//comparación de contraseñas cifradas desde la db y desde la ingresada en el front-end para el login 
// se usó funcion norma para el scope
userSchema.methods.comparePassword = function (password) {
    // comparar de manera asícrona; la del ususario y el dato del esquema
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model("User", userSchema);
