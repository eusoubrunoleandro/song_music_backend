require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');

const Router = require('./Router');
const app = Express();

app.use(bodyParser.json());
app.use(Router)
app.use((req, res) => res.setHeader("Access-Control-Allow-Origin", "*"))

app.listen(process.env.PORT || 3333)

module.exports = app;