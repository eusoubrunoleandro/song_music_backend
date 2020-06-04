const connection = require('../database/connection');
const Schema = connection.Schema;
const StrofeSchema = new Schema({
    strofe: {
        type: String,
        required: true,
    },
    song:{
        type: connection.Schema.Types.ObjectId,
        ref: "Song",
        required: true,
    },
    updateAt:{
        type: Number,
    }
},{
    collection: "letter"
})

module.exports = connection.model('Letter', StrofeSchema)