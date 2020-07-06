const Model = require('../Models/User');
const bcrypt = require('bcrypt');
const {currentDate} = require('../utils/currentTime');

module.exports = {
    async findAll(req, res){
        try {
            const list = await Model.find();
            if(!list.length)
            res.status(200).json({
                count: list.length,
                message: "Nenhum usuário encontrado"
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
            const {password, ...rest} = req.body;
            const passworCrypt = bcrypt.hashSync(password, 10);

            const join_data = Object.assign(rest, {
                password: passworCrypt,
                createdAt: currentDate(),
                updateAt: currentDate()
            })
            await Model.create(join_data);
            res.status(200).json({
                message: "Usuário cadastrado com sucesso!"
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
                message: "Usuário atualizado com sucesso!"
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
                message: "Usuário apagado com sucesso!"
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }        
    },
}