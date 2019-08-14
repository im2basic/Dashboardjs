const path = require('path')
const express = require("express")
const app = express()
const session = require('express-session')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'StayHumble',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

//-----------------------------MONGOOSE SETUP---------------------
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/mongoose-dashboard', {useNewUrlParser:true})


//-----------------MONGOOSE MODEL SETUP---------------------
const AnimalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String,
    favoriteFood: String
},{timestamps:true})

const Animal = mongoose.model('Animal', AnimalSchema)

//ROUTES
app.get('/', (req, res) => {
    Animal.find()
        .then(data => res.render('index', {mongooses: data}))
        .catch(err =>{
            res.json(err)
        })
});

app.get('/mongooses/new', (req,res) => {
    res.render('new')
})

app.post('/mongooses', (req,res) => {
    Animal.create(req.body)
        .then(newAnimal => {
            res.redirect('/')
        })
        .catch(err => res.json(err));
})

app.get('/mongooses/edit/:id', (req,res) => {
    Animal.findOne({_id: req.params.id})
        .then(animal => res.render('edit', {mongoose: animal}))
        .catch(err => res.json(err));
})

app.post('/mongooses/:id', (req,res) => {
    Animal.findOneAndUpdate({_id: req.params.id}, req.body,{useFindAndModify: false})
        .then(animal => res.redirect(`/mongoose/${animal._id}`))
        .catch(err=> res.json(err));
})

app.get('/mongoose/:id', (req,res) => {
    Animal.findOne({_id: req.params.id})
        .then(animal => res.render('show' , {mongoose: animal}))
        .catch(err => res.json(err))
})

app.get('/mongooses/destroy/:id', (req,res) => {
    Animal.deleteOne({_id: req.params.id})
        .then (result => res.redirect('/'))
        .catch(err => res.json(err))
})

app.listen(8000, () => console.log("listening on port 8000"));