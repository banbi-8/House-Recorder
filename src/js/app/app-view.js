define([
	'backbone',
	'pages/menu',
	'pages/record',
	'pages/transition',
	'pages/badget',
	'util/router'	
], function (
	Backbone,
	MenuView,
	HomeView,
	RecordView,
	TransitionView,
	BadgetView,
	AppRouter
) {
const AppView = Backbone.View.extend({
	el: '.app',
	initialize: function () {
		this.menuView = new MenuView();
		this.homeView = new HomeView;
		this.recordView = new RecordView();
		this.transitionView = new TransitionView();
		this.badgetView = new BadgetView();

		history.start();
		this.router = new AppRouter({
			menuView: this.menuView,
			homeView: this.homeView,
			recordView: this.recordView,
			transitionView: this.transitionView,
			badgetView: this.badgetView
		});

		this.listenTo(this.menuView, 'tab_OnClick', this.changeContent);
	},
	changeContent: function (eve) {
		const id = eve.target.id;
		this.router.navigate(id, {trigger: true});
	},
});

return AppView;
});