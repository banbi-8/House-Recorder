import {Router} from 'backbone';

import {menuView} from '../pages/menu';
import {homeView} from '../pages/home';
import {recordView} from '../pages/record';
import {transitionView} from '../pages/transition';
import {badgetView} from '../pages/badget';

const AppRouter = Router.extend({
	routes: {
		'': 'begin',
		'home': 'moveHome',
		'record': 'moveRecord',
		'transition': 'moveTransition',
		'badget': 'moveBadget'
	},
	begin: function () {
		menuView.render();
		this.moveBadget();
	},
	moveHome: function () {
		homeView.render();
	},
	moveRecord: function () {
		recordView.render();
	},
	moveTransition: function () {
		transitionView.render();	
	},
	moveBadget: function () {
		badgetView.render();
	}
});

export const router = new AppRouter();