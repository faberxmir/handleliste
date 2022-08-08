const connectToMongoDB = require('../modules/connectionHandler');
const User = require('../models/user');

connectToMongoDB();

//User create method
/**
 * @param {*} userGoogleID provided google id
 * @returns a user with no shoppinglists available
 */
async function createUser(userGoogleID) {
    return await User.create({
        userGoogleID,
        groceryLists: []
    })
}

/**
 * @param {string} id The provided ID can be either in the format googleid, or mongodb _id for a user
 * @param {object} updateOptions must be in the form of an options that you want to change. 
 * both options are unique, so both options will point to the same user. 
 * @returns a Query
 */
async function updateUser(id, updateOptions){
    return await User.updateOne({_id: id}, updateOptions);
}

//User read


//User update method


//User delete method

