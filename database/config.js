const mongoose = require('mongoose');
//const dns = require('dns');

const dbConnection = async() => {

    try {
        //dns.setServers(['8.8.8.8', '8.8.4.4']);
        //dns.setServers(['189.28.73.241']);
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online');
    } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de iniciar la base de datos');
        }
}

module.exports = {
    dbConnection
}