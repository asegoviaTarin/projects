'use strict'

var express = require('express')
var FavortitoController = require ('../controllers/favoritoController');

var api = express.Router();

api.get('/prueba/:nombre?',FavortitoController.prueba);

api.get('/get/:id',FavortitoController.getFavorito);

api.get('/getFavoritos',FavortitoController.getFavoritos);

api.post('/update/:id',FavortitoController.updateFavorito);

api.put('/update',FavortitoController.saveFavorito);

api.delete('/update/:id',FavortitoController.deleteFavorito);




module.exports = api;