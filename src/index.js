require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');

const Router = require('./Router');
const app = Express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Origin", "GET,PUT,POST,DELETE,OPTIONS");
    next()
})
app.use(bodyParser.json());
app.use(Router)

app.listen(process.env.PORT || 3333)

module.exports = app;