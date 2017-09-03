'use strict'

var Favorito = require('../models/favorito')

function prueba(request, response) {
    let nombre = request.params.nombre;
    response.send({ data: [2, 3, 4], menssage: "hola mundo con NodeJS y Express. Request: " + nombre })
}

function getFavorito(req, res) {
    var favoritoId = req.params.id;
    Favorito.findById(favoritoId, (err, fav) => {

        if (err) {
            res.status(500).send({ menssage: 'error al devolver favorito' });
        } else {
            res.status(200).send({ favorito: fav });

        }
    })
}

function getFavoritos(req, res) {
    var favoritoId = req.params.id;

    Favorito.find({}).sort('-id').exec((err, favoritos) => {
        if (err || !favoritos) {
            res.status(404).send({ menssage: 'no hay favoritos o se ha producidoun error' });
        } else {
            res.status(200).send({ favoritos });

        }
    });


}

function saveFavorito(req, res) {
    var params = req.body;
    var favorito = new Favorito();
    favorito.title = params.title;
    favorito.description = params.description
    favorito.url = params.url;

    favorito.save((err, favoritoStored) => {
        if (err) {
            res.status(500).send({ menssage: 'error al guardar favorito' });
        } else {
            res.status(200).send({ favoritoGuardado: favoritoStored });

        }
    });

}

function updateFavorito(req, res) {
    var favoritoId = req.params.id;
    var update = req.body;

    Favorito.findByIdAndUpdate(favoritoId, update, (err, favUpdated) => {

        if (err) {
            res.status(500).send({ menssage: 'error al actualizar favorito' });
        } else {
            res.status(200).send({ favorito: favUpdated });

        }
    })
}

function deleteFavorito(req, res) {
    var favoritoId = req.params.id;
    Favorito.findById(favoritoId, (err, fav) => {

        if (err) {
            res.status(500).send({ menssage: 'error al devolver favorito' });

        } else if (!fav) {
            res.status(500).send({ menssage: 'fav no encontrado' });

        } else {
            fav.remove(err => {

                if (err) {
                    res.status(500).send({ menssage: 'error al borrar favorito' });

                } else {
                    res.status(200).send({ menssage: 'se ha borrado!!!' });

                }
            })


        }
    })
}

module.exports = { prueba, getFavorito, getFavoritos, saveFavorito, updateFavorito, deleteFavorito }