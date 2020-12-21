const express = require('express');
const playlistsController = require('../controllers/playlists');

const playlistsRouter = express.Router();

playlistsRouter.post('/playlists', playlistsController.addPlaylist);

module.exports = playlistsRouter;

