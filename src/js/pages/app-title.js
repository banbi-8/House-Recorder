define([
	'jquery',
	'backbone',
	'text!templates/app-title.template'
], function (
	$,
	Backbone,
	template
) {
return AppTitleView = Backbone.View.extend({
	el: '.header-area',
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