const connection = require('../database/connection');
const Schema = connection.Schema;

const UserSchema = new Schema({
    complete_name: {
        type: String,
        required: true,
    },
    mail:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date
    },
    updateAt:{
        type: Date,
        default: Date.now
    }
},{
    collection: "user"
})

module.exports = connection.model('User', UserSchema)