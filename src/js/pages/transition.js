define([
	'jquery',
	'backbone',
], function (
	$,
	Backbone,
) {
const TransitionView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		Util.getTemplate('transition');
	},
	events: {
	},
	render: function () {
		this.$el.append(this.template_);
	}
});
return TransitionView;
});