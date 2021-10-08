require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;
db.user = process.env.DB_USER_NAME;
db.password = process.env.DB_PASSWORD;
db.name = process.env.DB_NAME;

db.users = require('./user.model.js')(mongoose);
db.posts = require('./post.model.js')(mongoose);
db.comments = require('./comment.model.js')(mongoose);
db.reactions = require('./react.model.js')(mongoose);
db.images = require('./image.model.js')(mongoose);

module.exports = db;