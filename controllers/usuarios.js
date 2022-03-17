const { response } = require('express');


const usuariosGet  = (req, res = response) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        msg:"Get Api -- controlador",
        q,
        nombre,
        apikey
    });

};

const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg:"Post Api --controlador",
        nombre ,
        edad
    });

}

const usuariosPut = (req, res ) => {

    const id = req.params.id;

    res.status(400).json({
        msg:"Put Api --controlador",
        id
    });

};

const usuariosPatch = (req, res ) => {

    res.json({
        msg:"Patch Api --controlador"
    });

};

const usuariosDelete = (req, res) => {

    res.json({
        msg:"Delete Api --controlador"
    });

  }




module.exports = {
    usuariosGet ,
    usuariosPost ,
    usuariosPut ,
    usuariosPatch ,
    usuariosDelete
}