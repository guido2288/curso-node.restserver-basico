
const Usuario = require('../models/usuario');
const Role = require('../models/role')

const esRolValido = async(rol = '')=> {
    const existeRol = await Role.findOne({ rol });


    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    } 
};

const mailValido = async( correo = '')=> {
    const existeMail = await Usuario.findOne({ correo });
    console.log(existeMail)
    if( existeMail ) {
        throw new Error(`El correo ${ correo } ya esta registrado`)
    }
};

const existeUsuarioPorId = async( id )=> {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`)
    }
}




module.exports = {
    esRolValido,
    mailValido,
    existeUsuarioPorId
}