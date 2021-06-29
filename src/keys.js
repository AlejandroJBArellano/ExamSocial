// const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
require("dotenv").config();
module.exports = {
    mongodb: {
        // ejecutar mongod y mongo
        URI: "mongodb://localhost:27017/examSocialBD",
        // URI: `mongodb://${process.env.NOTES_APP_MONGODB_HOST}:27017/${process.env.NOTES_APP_MONGODB_DATABASE}`
    }
};