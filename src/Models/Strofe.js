const connection = require('../database/connection');
const Schema = connection.Schema;
const StrofeSchema = new Schema({
    strof: {
        type: String,
        required: true,
    },
    song:{
        type: connection.Schema.Types.ObjectId,
        ref: "Song",
        required: true,
    },
    repeat:{
        type: Number,
        required: true,
    },
    coro:{
        type: Number,
    },
    sequence:{
        type: Number,
        required: true,
    }
},{
    collection: "strofe"
})

module.exports = connection.model('Strofe', StrofeSchema)