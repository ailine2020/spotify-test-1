const express = require('express');
require('dotenv').config();

app = express();

const mainRouter = express.Router();

const userRouter = require('./users');
const loginRouter = require('./login')
const playlistsRouter = require('./playlists')

mainRouter.use(userRouter);
mainRouter.use(loginRouter);
mainRouter.use(playlistsRouter);


mainRouter.get('/', (request, response, next) => {
  response.status(200).json({
    Message: "Bienvenue ! "
  })
});

mainRouter.get('/*', (request, response) => {
  response.status(404).json({
    NotFoundError: "Erreur 404"
  })
});

module.exports = mainRouter;