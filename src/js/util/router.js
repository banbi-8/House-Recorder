define([
	'jquery',
	'backbone',
	'pages/login',
	'pages/login-title',
	'pages/menu',
	'pages/home',
	'pages/record',
	'pages/transition',
	'pages/badget'
], function (
	$,
	Backbone,
	LoginView,
	LoginTitleView,
	MenuView,
	HomeView,
	RecordView,
	TransitionView,
	BadgetView
) {
return AppRouter = Backbone.Router.extend({
	initialize: function () {
		this.loginView = new LoginView();
		this.loginTitleView = new LoginTitleView();
		this.menuView = new MenuView();
		this.homeView = new HomeView;
		this.recordView = new RecordView();
		this.transitionView = new TransitionView();
		this.badgetView = new BadgetView();	

		this.showLoginContent();
	},
	routes: {
		'login': 'showLoginContent',
		'home': 'showHomeContent',
		'record': 'showRecordContent',
		'transition': 'showTransitionContent',
		'badget': 'showBadgetContent'
	},
	removeContents: function() {
		$('.contents-area').empty();
	},
	showLoginContent: function () {
		this.removeContents();
		this.loginTitleView.render();
		this.loginView.render();
	},
	showMenuContent: function () {
		this.removeContents();
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