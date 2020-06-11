const Model = require('../Models/Letter');
const timeCurrent = require('../utils/currentTime');

module.exports = {
    async findAll(req, res){
        try {
            const list = await Model.find({song: req.params.song_id}).sort('sequence');
            if(!list.length)
            res.status(200).json({
                count: list.length,
                message: "Nenhuma letra encontrado"
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
    async findId(req, res){
        try {
            const list = await Model.findOne({_id: req.params.id});
            if(!list)
            res.status(200).json({
                message: "Nenhuma letra encontrado"
            })

            res.status(200).json({
                content: list
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async findForSync(req, res){
        try {
            const list = await Model.find().sort('sequence');
            if(!list.length)
            res.status(200).json({
                message: "Nenhuma letra encontrado"
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
                createdAt: timeCurrent,
                updateAt: timeCurrent
            })
            await Model.create(join_data);
            res.status(200).json({
                message: "Letra cadastrado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }        
    },
    async update(req, res){
        try {
            const join_data = Object.assign(req.body, {
                updateAt: timeCurrent
            })
            await Model.updateOne({_id: req.params.id}, join_data);
            res.status(200).json({
                message: "Letra atualizado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async delete(req, res){
        try {
            await Model.deleteOne({_id: req.params.id});
            res.status(200).json({
                message: "Letra apagado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
}