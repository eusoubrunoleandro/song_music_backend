const express = require('express');

const CdController = require('./controllers/CdController');
const SongController = require('./controllers/SongController');
const StrofeController = require('./controllers/StrofeController');

const Router = express();

Router.get('/cd/list/', CdController.findAll);
Router.post('/cd/create/', CdController.insert);
Router.put('/cd/update/:id', CdController.update);
Router.delete('/cd/delete/:id', CdController.delete);

Router.get('/song/list/', SongController.findAll);
Router.post('/song/create/', SongController.insert);
Router.put('/song/update/:id', SongController.update);
Router.delete('/song/delete/:id', SongController.delete);

Router.get('/strofe/list/:song_id', StrofeController.findAll);
Router.post('/strofe/create/', StrofeController.insert);
Router.put('/strofe/update/:id', StrofeController.update);
Router.delete('/strofe/delete/:id', StrofeController.delete);

module.exports = Router;