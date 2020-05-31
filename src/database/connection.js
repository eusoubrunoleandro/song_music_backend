const Mongoose = require('mongoose')

try {
    Mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })   
} catch (error) {
    console.log(error)
}

module.exports = Mongoose