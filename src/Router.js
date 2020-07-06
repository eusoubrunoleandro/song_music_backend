const express = require('express');

const CdController = require('./controllers/CdController');
const SongController = require('./controllers/SongController');
const LetterController = require('./controllers/LetterController');
const DateControllerSync = require('./controllers/dateController');
const UserController = require('./controllers/UserController');
const Auth = require('./middleware/Auth');
const SignIn = require('./controllers/SignIn');

const Router = express();

Router.get('/cd/list/', CdController.findAll);
Router.get('/song/cd/:cd_id', SongController.findForCd);
Router.get('/letter/list/:song_id', LetterController.findAll);
Router.get('/letter/list/1/:id', LetterController.findId);

Router.post('/sync/cd/', DateControllerSync.searchDateCd)
Router.post('/sync/song/', DateControllerSync.searchDateSong)
Router.post('/sync/letter/', DateControllerSync.searchDateLetter)

Router.post('/signin', SignIn.signIn)

Router.use(Auth);

Router.get('/user/list/', UserController.findAll);
Router.post('/user/create/', UserController.insert);
Router.put('/user/update/:id', UserController.update);
Router.delete('/user/delete/:id', UserController.delete);

Router.post('/cd/create/', CdController.insert);
Router.put('/cd/update/:id', CdController.update);
Router.delete('/cd/delete/:id', CdController.delete);

Router.post('/song/create/', SongController.insert);
Router.put('/song/update/:id', SongController.update);
Router.delete('/song/delete/:id', SongController.delete);

Router.post('/letter/create/', LetterController.insert);
Router.put('/letter/update/:id', LetterController.update);
Router.delete('/letter/delete/:id', LetterController.delete);

module.exports = Router;