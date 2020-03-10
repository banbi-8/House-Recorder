define([
	'jquery',
	'backbone',
	'view/login',
	'view/create-account',
	'view/menu',
	'view/home',
	'view/record',
	'view/transition',
	'view/badget'
], function (
	$,
	Backbone,
	LoginView,
	CreateAccountView,
	MenuView,
	HomeView,
	RecordView,
	TransitionView,
	BadgetView
) {
return AppRouter = Backbone.Router.extend({
	initialize: function () {
		this.loginView = new LoginView();
		this.createAccountView = new CreateAccountView();

		this.showLoginContent();
	},
	routes: {
		'login': 'showLoginContent',
		'create_account': 'showCreateAccountContent',
		'home': 'showHomeContent',
		'record': 'showRecordContent',
		'transition': 'showTransitionContent',
		'badget': 'showBadgetContent'
	},
	prepareContentViews: function () {
		if (!this.homeView) { this.homeView = new HomeView; }
		if (!this.menuView) { this.menuView = new MenuView(); }
		if (!this.badgetView) { this.badgetView = new BadgetView(); }
		if (!this.recordView) { this.recordView = new RecordView(); }
		if (!this.transitionView) { this.transitionView = new TransitionView(); }
	},
	removeHeaderContents: function() {
		$('.header-area').empty();
	},
	removeContents: function() {
		$('.contents-area').empty();
	},
	showLoginContent: function () {
		this.removeHeaderContents();
		this.removeContents();
		this.loginView.render();
	},
	showCreateAccountContent: function () {
		this.removeContents();
		this.createAccountView.render();
	},
	showHomeContent: function () {
		this.prepareContentViews();
		
		this.removeHeaderContents();
		this.removeContents();
		this.menuView.render();
		this.homeView.render();
	},
	showRecordContent: function () {
		this.removeContents();
		this.recordView.entry();
	},
	showTransitionContent: function () {
		this.removeContents();
		this.transitionView.render();	
	},
	showBadgetContent: function () {
		this.removeContents();
		this.badgetView.entry();
	}
});
});