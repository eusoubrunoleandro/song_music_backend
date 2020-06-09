const ModelCd = require('../Models/CD');
const ModelSong = require('../Models/Song');
const ModelLetter = require('../Models/Letter');

module.exports = {
    async searchDateCd(req, res){
        try {
            const {dateTime} = req.body;
            const listCd = await ModelCd.find({$or: [
                {updateAt: { $gte: dateTime } },
                {createdAt: { $gte: dateTime } },
            ]});

            if(!listCd.length)
            res.status(200).json({
                count: listCd.length,
                message: "Nenhum cd encontrado"
            })

            const separatorDataCreatedAt = listCd.filter(cd => cd.createdAt > dateTime)
            const separatorDataUpdateAt = listCd.filter(cd => cd.updateAt > dateTime);

            res.status(200).json({
                count: listCd.length,
                content: {
                    news: separatorDataCreatedAt,
                    update: separatorDataUpdateAt
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
            const listSong = await ModelSong.find({$or: [
                {updateAt: { $gte: dateTime } },
                {createdAt: { $gte: dateTime } },
            ]});

            if(!listSong.length)
            res.status(200).json({
                count: listSong.length,
                message: "Nenhum song encontrado"
            })

            const separatorDataCreatedAt = listSong.filter(song => song.createdAt > dateTime)
            const separatorDataUpdateAt = listSong.filter(song => song.updateAt > dateTime);

            res.status(200).json({
                count: listSong.length,
                content: {
                    news: separatorDataCreatedAt,
                    update: separatorDataUpdateAt
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
            const listLetter = await ModelLetter.find({$or: [
                {updateAt: { $gte: dateTime } },
                {createdAt: { $gte: dateTime } },
            ]});

            if(!listLetter.length)
            res.status(200).json({
                count: listLetter.length,
                message: "Nenhuma letra encontrado"
            })

            const separatorDataCreatedAt = listLetter.filter(letter => letter.createdAt > dateTime)
            const separatorDataUpdateAt = listLetter.filter(letter => letter.updateAt > dateTime);

            res.status(200).json({
                count: listLetter.length,
                content: {
                    news: separatorDataCreatedAt,
                    update: separatorDataUpdateAt
                }
            })

        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    }
}
