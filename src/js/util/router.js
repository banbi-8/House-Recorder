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
		this.badgetView = new BadgetView();	
		this.menuView = new MenuView();
		this.homeView = new HomeView;
		this.recordView = new RecordView();
		this.transitionView = new TransitionView();
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