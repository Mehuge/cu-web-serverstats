var Promise = require('./basic-promise.js');
var $ = require('jquery');

var servers = [], server = "Hatchery";

function getServerInfo(server) {
    var domain = "camelotunchained.com";
    if (server) {
        for (var i = 0; i < servers.length; i++) {
            if (servers[i].name === server) {
                return servers[i];
            }
        }
        return {
            host: (server === "Hatchery" ? "hatchery" : server.toLowerCase()) + "." + domain
        };
    }
    return {
        host: "api.citystateentertainment.com"
    };
}

function getServerURI(verb) {
    var host, port = 8000, protocol = "http:";
    switch (verb) {
        case "servers":
            port = 8001;
            host = getServerInfo().host;
            break;
        case "characters":
            protocol = "https:";
            port = 4443;
            host = getServerInfo(server).host;
            break;
        default:
            if (typeof cuAPI !== "undefined" && "serverURL" in cuAPI) return cuAPI.serverURL;
            host = getServerInfo(server).host;
            break;
    }
    return protocol + "//" + host + ":" + port + "/api/";
}

var call = module.exports.exec = function(verb, params) {
    var serverURI = getServerURI(verb);

    // Raw call the CU RESI API, returns a promise
    params = params || {};
    return new Promise(function (fulfill, reject) {
        $.ajax({
            url: serverURI + verb,
            type: params.type || "GET",
            data: params.query,
            async: true, cache: false,
            accepts: params.accepts || "text/json",
            timeout: params.timeout,
            contentType: params.contentType,
            error: function (jqXHR, textStatus, errorThrown) {
                reject(textStatus, errorThrown, jqXHR);
            }
        }).done(function (data) {
            fulfill(data);
        });
    });
};

module.exports.selectServer = function(name) {
    server = name;
};

module.exports.getServers = function () {
    return new Promise(function (fulfill, reject) {
        call("servers").then(function (list) {
            servers = list;
            fulfill(servers);
        }, reject);
    });
};

module.exports.getFactions = function() {
    return call("game/factions", { timeout: 2000 });
};

module.exports.getRaces = function() {
    return call("game/races", { timeout: 2000 });
};

module.exports.getPlayers = function() {
    return call("game/players", { timeout: 2000 });
};

module.exports.getControlGame = function(query) {
    return call("game/controlgame", { query: query, timeout: 2000 });
};

module.exports.getBanes = function() {
    return call("game/banes");
};

module.exports.getBoons = function() {
    return call("game/boons");
};

module.exports.getAttributes = function() {
    return call("game/attributes");
};

module.exports.getCharacters = function(loginToken) {
    return call("characters", { query: { loginToken: loginToken } });
};

module.exports.getAbilities = function() {
    return call("abilities");
};

module.exports.getCraftedAbilities = function(query) {
    return call("craftedabilities", { query: query });
};

module.exports.getPatchNotes = function() {
    return call("patchnotes");
};

module.exports.getBanners = function() {
    return call("banners");
};

module.exports.getEvents = function() {
    return call("scheduledevents");
};

module.exports.getKills = function(query) {
    return call("kills", { query: query });
};
