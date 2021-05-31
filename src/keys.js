// const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
module.exports = {
    mongodb: {
        // ejecutar mongod y mongo
        URI: "mongodb://localhost:27017/examSocialBD",
        // URI: `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`
    }
};