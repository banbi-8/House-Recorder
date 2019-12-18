define([
	'jquery',
	'backbone',
	'pages/menu',
	'pages/home',
	'pages/record',
	'pages/transition',
	'pages/badget'
], function (
	$,
	Backbone,
	MenuView,
	HomeView,
	RecordView,
	TransitionView,
	BadgetView
) {
return AppRouter = Backbone.Router.extend({
	initialize: function () {
		this.menuView = new MenuView();
		this.homeView = new HomeView;
		this.recordView = new RecordView();
		this.transitionView = new TransitionView();
		this.badgetView = new BadgetView();	

		this.showMenuContent();
		this.showHomeContent();
	},
	routes: {
		'home': 'showHomeContent',
		'record': 'showRecordContent',
		'transition': 'showTransitionContent',
		'badget': 'showBadgetContent'
	},
	removeContents: function() {
		$('.contents-area').empty();
	},
	showMenuContent: function () {
		this.menuView.render();
	},
	showHomeContent: function () {
		this.removeContents();
		this.homeView.render();
	},
	showRecordContent: function () {
		this.removeContents();
		this.recordView.render();
	},
	showTransitionContent: function () {
		this.removeContents();
		this.transitionView.render();	
	},
	showBadgetContent: function () {
		this.removeContents();
		this.badgetView.render();
	}
});
});