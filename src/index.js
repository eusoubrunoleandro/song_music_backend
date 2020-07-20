require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Router = require('./Router');
const app = Express();

app.use(cors())
app.use(bodyParser.json());
app.use(Router)

app.listen(process.env.PORT || 3333)

module.exports = app;