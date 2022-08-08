require('dotenv').config();
const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../modules/connectionHandler');
const GroceryListModel = require('../models/grocerylist');
connectToMongoDB();

//unreachable route. Implemented for sake of sanity, and foresight of restructuring
router.get('*', (req, res, next) => {
        if(!req.user){
            res.json({message:'Only authorized users can access the api'})
        } else {
            next();
        }
    });

router.get('/info', (req, res) => {
        console.log(req.user);
        res.json(`${JSON.stringify(req.user)}`);
        res.end();
    });

router.post('/createlist', (req, res) => {

    const groceryList = {
        collaborators: [{
            userID: req.user.userGoogleID
        }]  
    }

    const title = req.query.title;
    if(title && typeof title != 'undefined'){
        groceryList.title = title;
    }

    GroceryListModel.create(groceryList)
        .then(doc => {
            res.json(JSON.stringify(doc));
        })
        .catch(err => {
            res.json(JSON.stringify(err.message));
        })
});

//refine. Should add collaborator by email only.
//Its ok to add nonexisting users. They will be found if registering later.
router.post('/addcollaborator', (req, res) => {
    GroceryListModel.findOne({"_id":req.query.listID})
        .then(doc => {
            doc.collaborators.push({"userID": req.query.collaboratorID});
            doc.save()
                .then(result => res.json(result))
                .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
});

router.post('/removecollaborator', (req, res) => {
    const listID = req.query.listID;
    const userID = req.query.userID;
    GroceryListModel.updateOne({_id: listID}, {$pull: {collaborators: {userID: userID}}})
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

router.post('/setgroceryincartstatus', (req, res) => {
    GroceryListModel.updateOne(
        {'_id': req.query.listID, 'groceries._id': req.query.groceryID}, //filter
        {$set:{
                "groceries.$.isInwagon": true
            }
        }) //operation
        .then(result => {
            console.log(`the operation gave results! ${result}`)
            res.json(result);
        })
            .catch(err => res.json(err));
    });

router.post('/removegrocerylist', (req, res) => {
        GroceryListModel.deleteOne({"_id": req.query.list_id})
            .then(result => {
                res.json({"deleted": result.deletedCount > 0 ? true:false})
   
            })
            .catch(err => {
                res.json(err.message);
            })
    });

router.post('/removegrocery', (req, res) => {
        GroceryListModel.findOne({"_id":req.query.list_id})
            .then( doc => {
                console.log(`/removegrocery found list ${doc}`);
                doc.groceries.id(req.query.grocery_id).remove();
                doc.save()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    });

    router.post('/addgrocery', (req, res) => {
            const listID = req.query.listID;
            const grocery = {};
            grocery.grocery_name = req.query.grocery_name;
    
            GroceryListModel.findOne({"_id":listID})
                .then(doc => {
                    doc.groceries.push(grocery);
                    doc.save()
                        .then(result => res.json(result)) 
                        .catch(err => res.json(err))
                })
                .catch(err => res.json(err));
    });

router.get('/getlist', (req, res) => {
    GroceryListModel.findOne({_id : req.query.listID})
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

router.get('/getlists', (req, res) => {
    GroceryListModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

//this route should not be accessible if not logged in
router.get('/getuser', (req, res) => {
    console.log(req.user);
    res.json({"message" : "authorized", "user" : req.user});
})

module.exports = router;