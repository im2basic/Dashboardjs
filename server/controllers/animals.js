const Animal = require('../models/animal')
module.exports= {
    index:  (req, res) => {
        Animal.find()
            .then(data => res.render('index', {mongooses: data}))
            .catch(err =>{
                res.json(err)
            })
    },

    show: (req, res) => {
        Animal.findOne({_id: req.params.id})
        .then(animals => res.render('show', {mongoose : animal}))
        .catch(err => res.json(err));
    },

    new: (req,res) => {
        res.render('new')
    },

    create: (req,res) => {
        Animal.create(req.body)
            .then(newAnimal => {
                res.redirect('/')
            })
            .catch(err => res.json(err));
    },

    edit: (req,res) => {
        Animal.findOne({_id: req.params.id})
            .then(animal => res.render('edit', {mongoose: animal}))
            .catch(err => res.json(err));
    },

    update: (req,res) => {
        Animal.findOneAndUpdate({_id: req.params.id}, req.body,{useFindAndModify: false})
            .then(animal => res.redirect(`/mongoose/${animal._id}`))
            .catch(err=> res.json(err));
    },

    destroy: (req,res) => {
        Animal.deleteOne({_id: req.params.id})
            .then (result => res.redirect('/'))
            .catch(err => res.json(err))
    }


}