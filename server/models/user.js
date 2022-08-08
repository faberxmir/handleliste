const mongoose = require('mongoose');
const {Schema} = mongoose;

class User {
    static #collectionName = "User";

    static #userSchema = new Schema  ({
        userGoogleID: {
            type: String,
            required: true, 
            unique: true},
        username: String,
        email: {
            type: String,
            unique: true,
            required: true
        }
    });

    constructor(userGoogleID){
        this.userGoogleID = userGoogleID;
    }

    static getUserSchema(){
        return User.#userSchema;
    }

    static getModel(...plugins) {
        const schema = this.getUserSchema();
        plugins.forEach( (plugin) => {
            this.#userSchema.plugin(plugin);
        });
        return new mongoose.model(this.#collectionName, schema);
    }
}


module.exports = User;