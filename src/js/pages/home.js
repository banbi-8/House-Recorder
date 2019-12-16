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
		//this.template_ = Util.getPageContent('home.template');
	},
	events: {
	},

	render: function () {
		this.$el.append(this.template_);
	}
});
return HomeView;
});