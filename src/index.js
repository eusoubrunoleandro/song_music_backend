require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');

const Router = require('./Router');
const app = Express();

app.use(Cors());
app.use(bodyParser.json());
app.use(Router)

app.listen(process.env.PORT || 3000)

module.exports = app;