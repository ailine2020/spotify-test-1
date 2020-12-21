const express = require('express');
const request = require('request');

require('dotenv').config();

const my_client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

const loginRouter = express.Router()

loginRouter.get('/login', function (request, response) {
    var scopes = 'user-read-private user-read-email';
    response.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });
  
  loginRouter.get('/callback', function (req, res) {
    let code = req.query.code || null
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' +
        Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
      },
      json: true
    }
    request.post(authOptions, function (error, response, body) {
      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
      res.redirect(uri + '?access_token=' + access_token)
    })
  });

module.exports = loginRouter