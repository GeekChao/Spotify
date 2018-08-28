let express = require('express');
let request = require('request');
let querystring = require('querystring');
let cors = require('cors');
let path = require('path');

let app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback';

app.get('/api/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private playlist-read-private user-read-recently-played streaming user-read-birthdate user-read-email',
      redirect_uri
    }));
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    var refresh_token = body.refresh_token
    let uri = process.env.FRONTEND_URI || ''
    res.redirect(uri + '/#' +
    querystring.stringify({
      access_token: access_token,
      refresh_token: refresh_token
    }));
  });
});

app.get('/api/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

let port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});