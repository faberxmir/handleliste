const express = require('express');
const router = express.Router();
const GroceryListHandler = require('../entities/GroceryListHandler');
require('dotenv').config();

//initiating db-connection - the handler class is our accesshandle
const groceryListHandler = new GroceryListHandler();

router
    .get('/info', (req, res) => {
        res.write('this is working');
        res.end();
    })
    .post('/create/:author', (req, res) => {
        console.info(`Creating grocerylist..`);
        groceryListHandler.createGroceryList(req.params.author)
            .then(
                result => {
                    res.send(JSON.stringify(result));
                }
            )
            .catch(err => console.error(err))
            .finally( () => {
                res.end();
            });
    })
    .get('/save', (req, res) => {
        list.save();
        res.end();
    })
    .post('/addgrocery', (req, res) => {
        try {
            groceryListHandler.addGrocery(req.query._id, req.query.grocery_name, req.query.price);
            res.redirect();
        } catch (err) {
            console.error(`An error occurred: ${err}`);
        } finally {
            res.end();
        }
        
    })
    .post('/removegrocerylist', (req, res) => {
        console.log(`trying to remove groceries req params = ${req.query.list_id}`);
        groceryListHandler.removeGroceryList(req.query.list_id)
            .then(result => {
                res.redirect('/');
            })
            .catch(error => {
                res.redirect(`/errorpage`);
            })
            .finally(_=> res.end());
    })
    .post('/removegrocery', (req, res) => {
        console.log(`trying to remove groceries req params = ${req.query.list_id} ${req.query.grocery_id}`);
        groceryListHandler.removeGrocery(req.query.list_id, req.query.grocery_id);
        res.end();
    })
    .get('/get/:listid', (req, res) => {
        const listid = req.params.listid;
        console.info(`Trying to get list ${listid} from mongoDB`);
        groceryListHandler.getGroceryList(listid)
            .then(result => {
                console.info(`successfull result: ${result}`);
            });
        console.log(`completed getting groceries from ${listid}`);
        res.end();
    })
module.exports = router;