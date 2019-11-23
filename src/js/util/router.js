import {Router} from 'backbone';

import {menuView} from '../pages/menu';
import {homeView} from '../pages/home';
import {recordView} from '../pages/record';
import {transitionView} from '../pages/transition';

const AppRouter = Router.extend({
	routes: {
		'': 'begin',
		'home': 'moveHome',
		'record': 'moveRecord',
		'transition': 'moveTransition'
	},
	begin: function () {
		menuView.render();
		this.moveTransition();
	},
	moveHome: function () {
		homeView.render();
	},
	moveRecord: function () {
		recordView.render();
	},
	moveTransition: function () {
		transitionView.render();	
	}
});

export const router = new AppRouter();