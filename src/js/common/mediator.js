define([
	'jquery',
	'underscore',
	'backbone'
],
function (
	$,
	_,
	Backbone
) {
Mediator = Backbone.View.extend({
	views: {},
	addView: function (name, view) {
		this.views[name] = view;
	},
	send: function (event, to, opts) {
		this.views[to].receive(event, opts);
	}
});

return new Mediator();
});
