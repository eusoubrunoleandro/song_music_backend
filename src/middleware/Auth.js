const jwt = require('jsonwebtoken');

function checkToken(req, res, next){
    const token = req.headers.auth;
    if(token === undefined || token === '')
    res.status(401).json({
        message: 'Você precisa estar logado no Song para continuar ;)',
        signin: false,
    })

    jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
        if(err)
        res.status(401).json({
            message: 'Oops! Acho que seu login expirou! Faça o login novamente <3',
            signin: false,
        })

        const {usot} = decoded;
        req.userCurrent = usot;
        next();
    })
}

module.exports = checkToken