const ModelCd = require('../Models/CD');
const ModelSong = require('../Models/Song');
const ModelLetter = require('../Models/Letter');
const ModelSyncRemove = require('../Models/syncRemove');

function convertingDate(date){
    return new Date(date);
}

function verifyUpdate(data, dateRequest){
    const createdAtConvert = convertingDate(data.createdAt)
    if(createdAtConvert < dateRequest)
    return data
}

function verifyCreated(data, dateRequest){
    const createdAtConvert = convertingDate(data.createdAt)
    if(createdAtConvert > dateRequest)
    return data
}

module.exports = {
    async searchDateCd(req, res){
        try {
            const {dateTime} = req.body;
            const convertDate = convertingDate(dateTime)
            const listRemove = await ModelSyncRemove.find({
                dateSync: {$gte: convertDate},
                cd_id: {$exists:true}
            })
            const listCd = await ModelCd.find({$or: [
                {updateAt: { $gte: convertDate } },
                {createdAt: { $gte: convertDate } },
            ]}, ['cd_name', 'year', 'createdAt', 'updateAt']);

            if(!listCd.length & !listRemove.length)
            res.status(200).json({
                count: listCd.length,
                message: "Nenhum cd encontrado"
            })

            const separatorDataCreatedAt = listCd.filter(cd => verifyCreated(cd, convertDate))
            const separatorDataUpdateAt = listCd.filter(cd => verifyUpdate(cd, convertDate));

            res.status(200).json({
                content: {
                    news: separatorDataCreatedAt,
                    update: separatorDataUpdateAt,
                    remove: listRemove
                }
            })

        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    },
    async searchDateSong(req, res){
        try {
            const {dateTime} = req.body;
            const convertDate = convertingDate(dateTime)

            const listRemove = await ModelSyncRemove.find({
                dateSync: {$gte: convertDate},
                song_id: {$exists:true}
            })
            const listSong = await ModelSong.find({$or: [
                {updateAt: { $gte: convertDate } },
                {createdAt: { $gte: convertDate } },
            ]}, ['song_name','cd_id', 'createdAt', 'updatedAt']);

            if(!listSong.length & !listRemove.length)
            res.status(200).json({
                count: listSong.length,
                message: "Nenhum song encontrado"
            })

            const separatorDataCreatedAt = listSong.filter(song => verifyCreated(song, convertDate))
            const separatorDataUpdateAt = listSong.filter(song => verifyUpdate(song, convertDate));

            res.status(200).json({
                content: {
                    news: separatorDataCreatedAt,
                    update: separatorDataUpdateAt,
                    remove: listRemove
                }
            })

        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    },
    async searchDateLetter(req, res){
        try {
            const {dateTime} = req.body;
            const convertDate = convertingDate(dateTime)
            const listRemove = await ModelSyncRemove.find({
                dateSync: {$gte: convertDate},
                song_id: {$exists:true}
            })
            const listLetter = await ModelLetter.find({$or: [
                {updateAt: { $gte: convertDate } },
                {createdAt: { $gte: convertDate } },
            ]}, ['strofe', 'song', 'repetir', 'voice_separator', 'sequence', 'createdAt', 'updatedAt']);

            if(!listLetter.length & !listRemove.length)
            res.status(200).json({
                count: listLetter.length,
                message: "Nenhuma letra encontrado"
            })

            const separatorDataCreatedAt = listLetter.filter(letter => verifyCreated(letter, convertDate))
            const separatorDataUpdateAt = listLetter.filter(letter => verifyUpdate(letter, convertDate));

            res.status(200).json({
                content: {
                    news: separatorDataCreatedAt,
                    update: separatorDataUpdateAt,
                    remove: listRemove
                }
            })

        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    }
}
