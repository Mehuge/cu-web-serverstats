var Rest = require('./lib/cu-rest.js');
var GameData = function(server) {
    Rest.selectServer(this.server = server);
    return this;
};
var timer;
GameData.prototype.poll = function(callback) {
    function rejected(e) {
        callback({ type: e });
    }
    timer = setInterval(function(){
        Rest.getControlGame({ includeControlPoints: false }).then(function(args) {
            callback({ type: "controlgame", data: args });
        }, rejected);
        Rest.getPlayers().then(function(args) {
            callback({ type: "population", data: args });
        }, rejected);
    },1000);
};
GameData.prototype.cancel = function() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};
module.exports = GameData;
