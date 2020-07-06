const jwt = require('jsonwebtoken');

function checkToken(req, res, next){
    const token = req.headers.auth;
    if(token === undefined || token === '')
    res.status(401).json({
        message: 'Precisamos que você faça login novamente ;)'
    })

    jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
        if(err)
        res.status(401).json({
            message: 'Sua sessão expirou, faça login novamente ;)'
        })

        const {usot} = decoded;
        req.userCurrent = usot;
        next();
    })
}

module.exports = checkToken