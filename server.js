// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// save the root directory of the app because the value of __dirname
// may change when referenced by different portions of the app
saveRoot = __dirname;

// combine the two sets of routes
require( __dirname + '/app/routing/htmlRoutes')(app);
require( __dirname + '/app/routing/apiRoutes')(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Notes
// See: https://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
//
// app.use(bodyParser.json()) basically tells the system that you want
// json to be used.
//
// bodyParser.urlencoded((extended: ...})) basically tells the system
// whether you want to use a simple algorithm for shallow parsing
// (i.e. false) or a complex algorithm for deep parsing that can deal
// with nested objects (i.e. true).
