define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home.template'
], function (
	$,
	_,
	Backbone,
	template
) {
return HomeView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = _.template(template);
	},
	events: {
	},

	render: function () {
		this.$el.html(this.template_);
	}
});
});