require('dotenv').config();
const Express = require('express');

const Router = require('./Router');
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Router)

app.listen(process.env.PORT || 3333)

module.exports = app;