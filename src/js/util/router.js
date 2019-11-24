import $ from 'jquery';
import {Router} from 'backbone';

const AppRouter = Router.extend({
	initialize: function (views) {
		this.menuView = views.menuView;
		this.homeView = views.homeView;
		this.recordView = views.recordView;
		this.transitionView = views.transitionView;
		this.badgetView = views.transitionView;

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

export {AppRouter};