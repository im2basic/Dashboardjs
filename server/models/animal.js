//-----------------MONGOOSE MODEL SETUP---------------------
const mongoose = require('mongoose')
const AnimalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String,
    favoriteFood: String
},{timestamps:true})

const Animal = mongoose.model('Animal', AnimalSchema)

module.exports=Animal;