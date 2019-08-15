//-----------------------------MONGOOSE SETUP---------------------
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/mongoose-dashboard', {useNewUrlParser:true})
const path = require('path')
const fs = require('fs')

const models_path = path.join(__dirname, './../models')

fs.readdirSync(models_path).forEach((file) => {
    if(file.indexOf('.js') >= 0){
        require(models_path + '/' + file)
    }
})