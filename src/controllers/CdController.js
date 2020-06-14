const Model = require('../Models/CD');
const ModelSong = require('../Models/Song');
const {currentDate} = require('../utils/currentTime');
const ModelSyncRemove = require('../Models/syncRemove');

module.exports = {
    async findAll(req, res){
        try {
            const list = await Model.find();
            if(!list.length)
            res.status(200).json({
                count: list.length,
                message: "Nenhum Cd encontrado"
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
                message: "Cd cadastrado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async update(req, res){
        try {
            const {cd_name, year} = req.body;
            const join_data = Object.assign(req.body, {
                updateAt: currentDate()()
            })

            await Model.updateOne({_id: req.params.id}, join_data);
            await ModelSong.updateMany({"cd.cd_id": req.params.id}, {
                cd: {cd_name_year: `${cd_name} - ${year}`}
            })
            res.status(200).json({
                message: "Cd atualizado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
    async delete(req, res){
        try {
            await ModelSong.deleteMany({cd_id: req.paramas.id})
            await Model.deleteOne({_id: req.params.id});
            await ModelSyncRemove.create({
                cd_id: req.params.id,
            })
            res.status(200).json({
                message: "Cd apagado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
}