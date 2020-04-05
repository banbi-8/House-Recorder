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
	send: function (event, to, opt_data) {
		this.views[to].receive(event, opt_data);
	}
});

return new Mediator();
});
