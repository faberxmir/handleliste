const mongoose = require('mongoose');
const {Schema} = mongoose;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://faberxmir:<password>@sandbox.dknkobf.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//Mongoose readystates
//Equivalent to static member variables?.
//Implisitly private since not exported?
const DISCONNECTED = 0;
const CONNECTED = 1;
const CONNECTING = 2;
const DISCONNECTING =  3;

const GrocerySchema = new Schema ({
    isInwagon: Boolean,
    price: Number,
    grocery_name: String
});

const ListSchema = new Schema ({
    author: String,
    isCompleted: Boolean,
    finalPrice: Number,
    groceries: [GrocerySchema]
});

//const Grocery = mongoose.model('grocery', GrocerySchema);
const GroceryList = mongoose.model('grocerylist', ListSchema);

class GroceryListHandler {

    /**
     * @param {string} connectionstring where to connect. If left undefined, uses option
     * from .env
     */
    constructor(connectionstring){
        this.isConnected = false;
        console.info(`Attempting connection to Atlas Cluster, please wait..`)
        this.createConnection(connectionstring)
            .then( mongoose => {
                console.info(`Successfully connected to Atlas Cluster! mongoose version ${mongoose.version}`)
            })
            .catch( err => {
                console.info(`failed connecting to ${connectionstring}`);
                //IMPLEMENT as ERRORHANDLING? 
                console.error(`Could not connect to Atlas Cluster:\n ${err.message}`)
            })
    }
    
    /**
     * 
     * @param {string} _id looks for a mongodb _id by the value of the string
     * @returns a promise with a grocery list model as the result
     */
    async getGroceryList(_id){
        return GroceryList.find({"_id":_id});   
    }

    /**
     * @param connectionString Optional argument. Can be used if wanting to override
     * process.env.DB_STRING
     * connects to the database defined in prosess.env.DB_STRING
     * checks connectionstate and acts if disconnecting or disconnected, else does nothing.
     * @returns null if no new connnection was made.
     */
    async createConnection(connectionString){
        return mongoose.connect(typeof connectionString === 'undefined' ?  process.env.DB_STRING : connectionString );
    }

    save(){
        console.info(`saving model..`);
        if(this.hasConnection()){
            this.groceryList.save();
            console.info(`save complete..`);
        } else {
            this.createConnection(connectionString)
                .then(_=> {
                    this.model.save();
                    console.info(`save complete..`);
                })
        }
    }
    
    /**
     * @param {string} author whomever created the list... 
     * @returns the mongoose grocerylistmodel
     */
    async createGroceryList(author){
        const groceryList = new GroceryList(
            {
                author,
                isCompleted: false,
                finalPrice: 0,
                groceries: []
            });
        return groceryList.save();
            
    }
    //addGroceryByListID(_listID, grocery_name, price)

    /**
     * @param {*} groceryList must be the actual model 
     * @param {*} grocery_name 
     * @param {*} price 
     * @returns a promise
     */
    async addGrocery(grocerylistID, grocery_name, price){
        let result = null;
        this.getGroceryList(grocerylistID)
            .then(([grocerylist]) => {
                let grocery = this.groceryFactory(grocery_name, price);
                grocerylist.groceries.push(grocery);
                result = grocerylist.save();
            })
            .catch(err => {
                console.error(err);
            })
            .finally(_ => {
                return result;
            });
    }
    async removeGroceryList(groceryListID) {
        return GroceryList.findByIdAndDelete(groceryListID); 
    }

    async removeGrocery(groceryListID, groceryID){
        this.getGroceryList(groceryListID)
            .then(([grocerylist]) => {
                console.log(`grocerylist: ${grocerylist} was found!`)
                grocerylist.groceries.id(groceryID).remove()
                    .then(result => {
                        console.log(`succcess ${result} was removed`);
                    })
                    .catch(error => console.error(error))
                    .finally(_=>{});
            })
    }

    /**
     * @param {*} grocery_name 
     * @param {*} price 
     * Convenience method for creating groceries in the list. Assures that each object has
     * valid values for insertion into the DB
     * @returns a new literal object matching the grocery schema, or null if grocery_name not provided
     */
    groceryFactory(grocery_name, price){
        let result = null;
        if(!this.isNullOrUndefined(grocery_name)){
            result = {
                grocery_name,
                price: this.isNullOrUndefined(price)? 0 : price,
                isInwagon: false //this is always true upon creation, and thereby false...
            }
        }
        
        return result;
    }
    //returns true if param is null or 'undefined'
    isNullOrUndefined(param){
        return param === 'undefined' || param === null;
    }

    setGroceryToBasket(id){

    }

    hasConnection(){
        return mongoose.connection.readyState === CONNECTED || mongoose.connection.readyState === CONNECTING;
    }

    setListTitle() {
        return `${author}s Grocery list`;
    }
    getAuthor(){
        return this.author;
    }
    getDate(){
        return this.date;
    }

    getListAsJson(){
        return this.groceries.length > 0 ? JSON.stringify(this.groceries):null;
    }
}

module.exports = GroceryListHandler;