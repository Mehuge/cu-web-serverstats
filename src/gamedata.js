var Rest = require('./lib/cu-rest.js');
var GameData = function(server) {
    Rest.selectServer(this.server = server);
    return this;
};
var timer;
GameData.prototype.poll = function(callback) {
    timer = setInterval(function(){
        Rest.getControlGame({ includeControlPoints: false }).then(function(args) {
            callback({ type: "controlgame", data: args });
        });
        Rest.getPlayers().then(function(args) {
            callback({ type: "population", data: args });
        });
    },1000);
};
GameData.prototype.cancel = function() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};
module.exports = GameData;
