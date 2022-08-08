const mongoose = require('mongoose');

/**
 * @param {string} connectionString 
 * Optional paramater.
 * If no argument is provided, this function will by default look to .env for a connectionString called DB_STRING 
 */
async function connectToMongoDB(connectionString) {
    console.info(`ConnectionHandler: Attempting connection to Atlas Cluster, please wait..`)
    createConnection(connectionString)
        .then( mongoose => {
            console.info(`ConnectionHandler: Successfully connected to Atlas Cluster! mongoose version ${mongoose.version}`)
        })
        .catch( err => {
            //IMPLEMENT as ERRORHANDLING? 
            console.error(`ConnectionHandler: Could not connect to Atlas Cluster:\n ${err.message}`)
        })
}

function createConnection(connectionString){
    return mongoose.connect(typeof connectionString === 'undefined' ?  process.env.DB_STRING : connectionString );
}

module.exports = connectToMongoDB;
