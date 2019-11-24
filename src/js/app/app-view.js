import {View} from 'backbone';
import {history} from "backbone";

import {menuView} from '../pages/menu';
import {homeView} from '../pages/home';
import {recordView} from '../pages/record';
import {transitionView} from '../pages/transition';
import {badgetView} from '../pages/badget';
import {AppRouter} from '../util/router';

const AppView = View.extend({
	el: '.app',
	initialize: function () {
		this.menuView = menuView;
		this.homeView = homeView;
		this.recordView = recordView;
		this.transitionView = transitionView;
		this.badgetView = badgetView;

		history.start();
		this.router = new AppRouter({
			menuView: this.menuView,
			homeView: this.homeView,
			recordView: this.recordView,
			transitionView: this.transitionView,
			badgetView: this.badgetView
		});

		this.listenTo(this.menuView, 'homeTab_OnClick', this.changeContent);
		this.listenTo(this.menuView, 'badgetTab_OnClick', this.changeContent);
		this.listenTo(this.menuView, 'recordTab_OnClick', this.changeContent);
		this.listenTo(this.menuView, 'transitionTab_OnClick', this.changeContent);
	},
	changeContent: function (eve) {
		const id = eve.target.id;
		this.router.navigate(id, {trigger: true});
	},
});

export {AppView};