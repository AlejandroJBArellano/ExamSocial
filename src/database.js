const mongoose = require("mongoose"), { mongodb } = require("./keys");

// 1er parámetro de direciión; 2do de objeto de configuración
mongoose.connect(mongodb.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log(`database connected on ${mongodb.URI}`))
    .catch(err => console.error(err))