const Model = require('../Models/Song');
const ModelLetter = require('../Models/Letter');

module.exports = {
    async findAll(req, res){
        try {
            // let search = {};
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
    async insert(req, res){
        try {
            await Model.create(req.body);
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
            await Model.updateOne({_id: req.params.id}, req.body);
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