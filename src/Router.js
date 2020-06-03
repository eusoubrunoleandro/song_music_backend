const express = require('express');

const CdController = require('./controllers/CdController');
const SongController = require('./controllers/SongController');
const LetterController = require('./controllers/LetterController');

const Router = express();

Router.get('/cd/list/', CdController.findAll);
Router.post('/cd/create/', CdController.insert);
Router.put('/cd/update/:id', CdController.update);
Router.delete('/cd/delete/:id', CdController.delete);

Router.get('/song/list/', SongController.findAll);
Router.post('/song/create/', SongController.insert);
Router.put('/song/update/:id', SongController.update);
Router.delete('/song/delete/:id', SongController.delete);

Router.get('/letter/list/:song_id', LetterController.findAll);
Router.post('/letter/create/', LetterController.insert);
Router.put('/letter/update/:id', LetterController.update);
Router.delete('/letter/delete/:id', LetterController.delete);

module.exports = Router;