const connection = require('../database/connection');
const Schema = connection.Schema;
const CdSchema = new Schema({
    cd_name: {
        type: String,
        required: true,
    },
    year: {
        type: Number
    },
    createdAt:{
        type: Date
    },
    updateAt:{
        type: Date,
        default: Date.now
    }
},{
    collection: "cd"
})

module.exports = connection.model('Cd', CdSchema)