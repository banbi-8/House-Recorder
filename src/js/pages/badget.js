define([
	'jquery',
	'backbone',
	'text!templates/badget.template'
], function (
	$,
	Backbone,
	template
) {
return BadgetView = Backbone.View.extend({
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