define([
	'jquery',
	'backbone',
	'util/util',
	'text!templates/login.template'
], function (
	$,
	Backbone,
	Util,
	template
) {
return LoginView = Backbone.View.extend({
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