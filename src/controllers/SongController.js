const Model = require('../Models/Song');
const ModelLetter = require('../Models/Letter');
const ModelSyncRemove = require('../Models/syncRemove');
const {currentDate} = require('../utils/currentTime');

module.exports = {
    async findAll(req, res){
        try {
            const querySearch = req.query.search;
            const search = querySearch === undefined ? {} : {
                $or:[
                    {song_name: new RegExp(querySearch, 'i')},
                    {"cd.cd_name_year": new RegExp(querySearch, 'i')}
                ]
            }

            const list = await Model.find(search);
            if(!list.length)
            res.status(200).json({
                count: list.length,
                message: "Nenhum Song encontrado"
            })

            res.status(200).json({
                count: list.length,
                content: list
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async findForCd(req, res){
        try {
            const list = await Model.find({
                "cd.cd_id": req.params.cd_id
            });
            if(!list.length)
            res.status(200).json({
                count: list.length,
                message: "Nenhum Song encontrado"
            })

            res.status(200).json({
                count: list.length,
                content: list
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async insert(req, res){
        try {
            const join_data = Object.assign(req.body, {
                createdAt: currentDate(),
                updateAt: currentDate()
            })
            await Model.create(join_data);
            res.status(200).json({
                message: "Song cadastrado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async update(req, res){
        try {
            const join_data = Object.assign(req.body, {
                updateAt: currentDate()
            })
            
            await Model.updateOne({_id: req.params.id}, join_data);
            res.status(200).json({
                message: "Song atualizado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async delete(req, res){
        try {
            await ModelLetter.deleteMany({song: req.params.id})
            await Model.deleteOne({_id: req.params.id});
            await ModelSyncRemove.create({
                song_id: req.params.id,
            })
            res.status(200).json({
                message: "Song apagado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }        
    },
}