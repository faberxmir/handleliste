const Mongoose = require('mongoose');


class DbHandler {

    constructor(connectionstring){    
       console.log(`constructing DbHandler, attempting connect to mongoDb... wait for it...`);
        Mongoose.connect(connectionstring)
            .then( result => console.log(`Success?: ${result}`))
            .catch( err => console.log(`Error: ${err}`));
    }

}

module.exports = DbHandler;