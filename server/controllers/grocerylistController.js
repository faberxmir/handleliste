
//createGroceryList
const createGroceryList = ( req, res) => {

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
            res.json(doc);
        })
        .catch(err => {
            res.json(err.message);
        })
}

module.exports = {
    createGroceryList
}
//getAllGroceryLists

//getGroceryListByID

//DeleteGroceryList

//AddCollaborator

//AddGrocery ..to grocerylist

//RemoveGrocery ..from grocerylist

//setGroceryToBasket ..as in change status to yup, its in the basket