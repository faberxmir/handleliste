const GroceryListModel = require('../models/grocerylist');

// Database request interaction interface
// This module helps keeping the routes clean, and their internal functinality more semantic.

module.exports = {
    createList(req, res, userID, title){

        const list = GroceryListModel.create({
            title: null,
            collaborators: [{
                userID
            }]  
        })
        .then(doc => {
            console.log(`creation of ${doc} was completed`);
            res.json(JSON.stringify(doc));
        })
        .catch(err =>{
            console.log(`Could not create item: ${err.message} && ${err}`);
            res.end();
        })
    }
}