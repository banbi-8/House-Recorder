define([
	'jquery',
	'backbone',
	'page/login/view/login',
	'page/account/view/create-account',
	'page/common/view/header-area',
	'page/home/view/home',
	'page/record/view/record',
	'page/transition/view/transition',
	'page/badget/view/badget'
], function (
	$,
	Backbone,
	LoginView,
	CreateAccountView,
	HeaderAreaView,
	HomeView,
	RecordView,
	TransitionView,
	BadgetView
) {
return AppRouter = Backbone.Router.extend({
	initialize: function () {
		this.loginView = new LoginView();
		this.createAccountView = new CreateAccountView();

		this.start();
	},

	routes: {
		'login': 'showLoginContent',
		'create_account': 'showCreateAccountContent',
		'home': 'showHomeContent',
		'record': 'showRecordContent',
		'transition': 'showTransitionContent',
		'badget': 'showBadgetContent'
	},

	start: function () {
		this.showLoginContent();
	},

	prepareContentViews: function () {
		if (!this.homeView) { this.homeView = new HomeView(); }
		if (!this.headerAreaView) { this.headerAreaView = new HeaderAreaView(); }
		if (!this.badgetView) { this.badgetView = new BadgetView(); }
		if (!this.recordView) { this.recordView = new RecordView(); }
		if (!this.transitionView) { this.transitionView = new TransitionView(); }
	},

	showLoginContent: function () {
		$('.header-area').empty();
		$('.contents-area').empty();
		this.loginView.render();
	},

	showCreateAccountContent: function () {
		$('.contents-area').empty();
		this.createAccountView.render();
	},

	showHomeContent: function () {
		this.prepareContentViews();
		
		$('.header-area').empty();
		this.headerAreaView.render();
		this.homeView.render();
	},

	showRecordContent: function () {
		this.recordView.render();
	},

	showTransitionContent: function () {
		this.transitionView.render();	
	},

	showBadgetContent: function () {
		this.badgetView.render();
	}
});
});