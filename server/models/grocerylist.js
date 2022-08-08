const {mongoose, Schema} = require('mongoose');
const User = require('./user');

const UserSchema = User.getUserSchema();

const GrocerySchema = new Schema ({
    isInwagon: {
      type: Boolean,
      default: false  
    },
    price: {
        type: Number,
        default: 0
    },
    grocery_name: {
        type: String,
        unique: true,
        required: true
    }
});

// new Schema  ({
//     // alternative to userGoogleID = mongoose.SchemaTypes.ObjectId
//     // that would ease implementation of other login strategies
//     userID: {
//         type: String,
//         required: true
//     }
// });

const ListSchema = new Schema ({
    title: {
        type: String,
        default: "HandleListe"
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    finalPrice: {
        type: Number,
        default: 0
    },
    collaborators: {
        type: [UserSchema],
        validate: {
            validator: array => array.length > 0,
            message: props => `props.length is ${props.length}. but any list must have at least one collaborator`
        }
    },
    groceries: {
        type: [GrocerySchema],
        default: []
    }
});

module.exports = mongoose.model("GroceryList", ListSchema);