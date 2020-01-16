define([
	'jquery',
	'backbone',
	'text!templates/home.template'
], function (
	$,
	Backbone,
	template
) {
return HomeView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = template;
	},
	events: {
	},

	render: function () {
		this.$el.append(this.template_);
	}
});
});