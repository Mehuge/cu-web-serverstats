// Event table
var _evhs = {};
var _eventIdGenerator = 0;

// Subscribe to an event
module.exports.on = module.exports.sub = function(ev, context, handler) {
	if (typeof context === "function") {
		handler = context;
		context = undefined;
	}
	var id = this._eventIdGenerator++;
	var handlers = _evhs[ev] = _evhs[ev] || {};
	handlers[id] = {
		id: id,
		type: ev,
		handler: handler,
		context: context
	};
	return handlers[id];
};

// Publish an event
module.exports.fire = module.exports.pub = function(ev, args) {
	var handlers = _evhs[ev], count = 0;
	for (var id in handlers) {
		var e = handlers[id];
		if (e && !e.disabled && e.handler) {
			e.handler.call(e.context||this, args);
			count ++;
		}
	}
	return count;
};

// Unsubscribe from an event
module.exports.ignore = module.exports.unsub = function(ev) {
	delete _evhs[ev.type][ev.id];
};
