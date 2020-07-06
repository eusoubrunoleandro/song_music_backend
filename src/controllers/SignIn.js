const ModelUser = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({
        usot: id
    }, process.env.SECRET_KEY_TOKEN, {
        expiresIn: 604800,
    })
}

module.exports = {
    async signIn(req, res){
        const {mail, password} = req.body;
        const verifyMailIfExists = await ModelUser.find({mail: mail});
        if(!verifyMailIfExists.length)
        res.status(401).json({message: "E-mail ou senha incorretos!"})

        const checkPassword = await bcrypt.compare(password, verifyMailIfExists[0].password);
        if(!checkPassword)
        res.status(401).json({message: "E-mail ou senha incorretos!"})

        res.status(200).json({
            token: generateToken(verifyMailIfExists[0]._id)
        })
    }
}