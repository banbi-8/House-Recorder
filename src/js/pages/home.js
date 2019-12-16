define([
	'jquery',
	'backbone',
], function (
	$,
	Backbone,
) {
const HomeView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		Util.getTemplate('home');
	},
	events: {
	},

	render: function () {
		this.$el.append(this.template_);
	}
});
return HomeView;
});