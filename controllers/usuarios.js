const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

// Mostramos los usuarios
const usuariosGet  = async(req, res = response) => {

    const { limite = 5 , desde = 0} = req.query;
    const query = { estado : true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit(  Number( limite ) )
    ])

    res.json({
        total,
        usuarios
    });

};
// Creamos los usuarios
const usuariosPost = async(req, res) => {

    const { nombre, correo , password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    // Gaurdar en BD
    await usuario.save();

    res.json({
        usuario
    });

}

const usuariosPut = async(req, res = response ) => {

    const {id} = req.params;
    const { password, google, ...resto } = req.body;
    console.log(id)
    console.log(resto)
    // ToDo validar contra BD
    if ( password ) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const  usuario = await Usuario.findOneAndUpdate( id, resto , {new: true});
    console.log(usuario)
    res.json(usuario);

};

const usuariosPatch = (req, res ) => {

    res.json({
        msg:"Patch Api --controlador"
        
    });

};

const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );

    // Cambiando el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
    });

  }




module.exports = {
    usuariosGet ,
    usuariosPost ,
    usuariosPut ,
    usuariosPatch ,
    usuariosDelete
}