const express = require('express');

const CdController = require('./controllers/CdController');
const SongController = require('./controllers/SongController');
const LetterController = require('./controllers/LetterController');
const DateControllerSync = require('./controllers/dateController');

const Router = express();

Router.get('/cd/list/', CdController.findAll);
Router.post('/cd/create/', CdController.insert);
Router.put('/cd/update/:id', CdController.update);
Router.delete('/cd/delete/:id', CdController.delete);

Router.get('/song/list/', SongController.findAll);
Router.get('/song/cd/:cd_id', SongController.findForCd);
Router.post('/song/create/', SongController.insert);
Router.put('/song/update/:id', SongController.update);
Router.delete('/song/delete/:id', SongController.delete);

Router.get('/letter/list/', LetterController.findForSync);
Router.get('/letter/list/:song_id', LetterController.findAll);
Router.get('/letter/list/1/:id', LetterController.findId);
Router.post('/letter/create/', LetterController.insert);
Router.put('/letter/update/:id', LetterController.update);
Router.delete('/letter/delete/:id', LetterController.delete);

// sync
Router.post('/sync/cd/', DateControllerSync.searchDateCd)
Router.post('/sync/song/', DateControllerSync.searchDateSong)
Router.post('/sync/letter/', DateControllerSync.searchDateLetter)

module.exports = Router;