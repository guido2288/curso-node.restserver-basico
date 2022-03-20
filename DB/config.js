const mongoose = require('mongoose');

const dbConnection = async() => {

    // await mongoose.connect(process.env.MONGODB_ATLAS )

    try {
        
        mongoose.connect( process.env.MONGODB_ATLAS );
        
        console.log('Conección a la BD');

    } catch (error) {
        console.log(error)
        throw new Error('Error al conectarse a la BD')
    }

}




module.exports = {
    dbConnection
}