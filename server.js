const express = require("express")
const app = express()
const session = require('express-session')
const bodyParser= require('body-parser')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'StayHumble',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

require('./server/config/database')
require('./server/config/routes')(app)


app.listen(8000, () => console.log("listening on port 8000"));