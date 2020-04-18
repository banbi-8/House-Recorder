define([
	'jquery',
	'backbone',
	'text!templates/transition.template'
], function (
	$,
	Backbone,
	template
) {
return TransitionView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = template;
	},
	events: {
	},
	render: function () {
		this.$el.html(this.template_);
	}
});
});