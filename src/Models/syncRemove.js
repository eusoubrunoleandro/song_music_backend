const connection = require('../database/connection');
const Schema = connection.Schema;
const SyncRemoveSchema = new Schema({
    cd_id: {
        type: connection.Schema.Types.ObjectId,
        ref: "Cd"
    },
    song_id: {
        type: connection.Schema.Types.ObjectId,
        ref: "Song"
    },
    letter_id: {
        type: connection.Schema.Types.ObjectId,
        ref: "Letter"
    },
    dateSync:{
        type: Date,
        default: Date.now
    }
},{
    collection: "syncRemove",
})

module.exports = connection.model('SyncRemove', SyncRemoveSchema)