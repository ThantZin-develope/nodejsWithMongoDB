require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = express.Router();
const path = require('path');
const app = express();

app.use(cors({ origin: "*" }));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const db = require('./app/models/index.js');

db.mongoose.connect(db.url, { dbName: db.name, user: db.user, pass: db.password, autoCreate: true, autoIndex: true }).then(

    () => { console.log('Successfully Connected to Database') }
).catch(error => {
    console.log('Error while connecting to DB ', error.message
    );
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/app/view/index.html'));
});

require('./app/routes/user.route.js')(router);
require('./app/routes/post.route.js')(router);
require('./app/routes/image.route.js')(router);
require('./app/routes/react.route.js')(router);
require('./app/routes/comment.route.js')(router);

app.listen(process.env.PORT || 9000, () => {
    console.log('Server is listening at PORT => ', 9000);
})


console.log(process.env.PORT);