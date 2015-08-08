var React = require('react');
var Data = require('./gamedata.js');
var ServerStats = require('./serverstats.js');
var app = new ServerStats(document.getElementById("server-stats-container"));
app.render();
app.update("gamestart");
app.update("gamescore", {
    arthurian: 12031,
    tdd: 12032,
    viking: 12033
});
app.update("population", {
    arthurian: 10,
    tdd: 20,
    viking: 15
});
