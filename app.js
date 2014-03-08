
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var region = require('./javascripts/regions.json');         

function loadRegion(req, res, next) {
    var regName = req.params.regName;
    for(var i= 0, len = region.length; i < len; i++) {
      if ( regName === region[i].name ) {
        req.region = region[i];
      }
    }
    if(!req.region) next(new Error('No such region ' + regName));
    else next();
}

//routes data
var sendInfo = function (req, res, next) {
  res.render('region',{
    title: req.region.info
  });
}


//view in browser
app.get('/:regName', loadRegion, sendInfo, function(err, req, res, next) {
   if (err) {


      //redirects to home if error
      res.redirect('/');
   }
});



app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/region', function(req, res){
  res.render('region', {
    title: 'Region'
  });
});

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
