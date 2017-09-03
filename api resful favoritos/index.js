'use strict'
var app = require('./app')
let port = process.env.PORT || 3678;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cursofavoritos', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('connexion a mongoDB correcta');
        app.listen(port, () => {
            console.log('servidor corriendo en el puerto 3678');
        });
    }
});