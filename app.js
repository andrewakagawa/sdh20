
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var d3 = require('d3');

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


app.get('/test', function(req, res){
  res.render('test', {
    title: 'D3 test'
  });
});

app.get('/region2', function(req, res){
  res.render('region2', {
    title: 'D3 test'
  });
});


//create an array of
var region = [
    { name: 'alpine', title : 'Alpine'},
    { name: 'anza-borregosprings', title : 'Anza-Borrego Springs'},
    { name: 'carlsbad', title : 'Carlsbad'},
    { name: 'centralsd', title : 'Central SD'},
    { name: 'chulavista', title : 'Chula Vista'},
    { name: 'coastal', title : 'Coastal'},
    { name: 'coronado', title : 'Coronado'},
    { name: 'delmar-miramesa', title : 'Del Mar-Mira Mesa'},
    { name: 'elcajon', title : 'El Cajon'},
    { name: 'elliott-navajo', title : 'Elliott-Navajo'},
    { name: 'escondido', title : 'Escondido'},
    { name: 'fallbrook', title : 'Fallbrook'},
    { name: 'harbisoncrest', title : 'Harbison Crest/El Cajon**'},
    { name: 'jamul', title : 'Jamul'},
    { name: 'kearnymesa', title : 'Kearny Mesa'},
    { name: 'lamesa', title : 'La Mesa'},
    { name: 'laguna-pinevalley', title : 'Laguna-Pine Valley'},
    { name: 'lakeside', title : 'Lakeside'},
    { name: 'lemongrove', title : 'Lemon Grove'},
    { name: 'midcity', title : 'Mid-City'},
    { name: 'miramar', title : 'Miramar'},
    { name: 'mountainempire', title : 'Mountain Empire'},
    { name: 'nationalcity', title : 'National City'},
    { name: 'northsd', title : 'North SD'},
    { name: 'oceanside', title : 'Oceanside'},
    { name: 'palomar-julian', title : 'Palomar-Julian'},
    { name: 'pauma', title : 'Pauma'},
    { name: 'pendleton', title : 'Pendleton'},
    { name: 'peninsula', title : 'Peninsula'},
    { name: 'poway', title : 'Poway'},
    { name: 'ramona', title : 'Ramona'},
    { name: 'sandieguito', title : 'San Dieguito'},
    { name: 'sanmarcos', title : 'San Marcos'},
    { name: 'santee', title : 'Santee'},
    { name: 'southbay', title : 'South Bay'},
    { name: 'southeastsd', title : 'Southeast SD'},
    { name: 'springvalley', title : 'Spring Valley'},
    { name: 'sweetwater', title : 'Sweetwater'},
    { name: 'university', title : 'University'},
    { name: 'valley', title : 'ValleyCenter'},
    { name: 'vista', title : 'Vista'},
    { name: "SDCO", title: 'San Diego County'}
];

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
    name: req.region.name, title: req.region.title
  });
}


//view in browser
app.get('/:regName', loadRegion, sendInfo, function(err, req, res, next) {
   if (err) {


      //redirects to home if error
      res.redirect('/');
   }
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
