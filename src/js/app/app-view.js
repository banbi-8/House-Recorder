define([
	'backbone',
	'util/router'	
], function (
	Backbone,
	AppRouter
) {
return AppView = Backbone.View.extend({
	el: '.app',
	initialize: function () {
		this.router = new AppRouter();

		Backbone.history.start();

		this.listenTo(this.menuView, 'tab_OnClick', this.changeContent);
	},
	changeContent: function (eve) {
		const id = eve.target.id;
		this.router.navigate(id, {trigger: true});
	},
});
});