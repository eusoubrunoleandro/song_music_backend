require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');

const Router = require('./Router');
const app = Express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})
app.use(bodyParser.json());
app.use(Router)

app.listen(process.env.PORT || 3333)

module.exports = app;