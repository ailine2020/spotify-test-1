const express = require('express');
require('dotenv').config();
const {Pool} = require("pg");
const request = require('request');

app = express();

const mainRouter = express.Router();
const userRouter = require('./users');
const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const my_client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';


const pool = new Pool({
  username,
  host,
  database,
  password,
  port: 5432
});
console.log("Database connected!");

mainRouter.use(userRouter);

/* GET home page. */
mainRouter.get('/', (request, response, next) => {
  response.status(200).json({
    Message: "Bienvenue ! "
  })
});

/*Auth Spotify */
mainRouter.get('/login', function (req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

mainRouter.get('/callback', function (req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function (error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
});

mainRouter.get('/*', (request, response) => {
  response.status(404).json({
    NotFoundError: "Erreur 404"
  })
});

module.exports = mainRouter;