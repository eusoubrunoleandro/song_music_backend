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
        type: Number
    },
    updateAt:{
        type: Number
    }
},{
    collection: "cd"
})

module.exports = connection.model('Cd', CdSchema)