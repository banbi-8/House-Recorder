import {Router} from 'backbone';

import {menuView} from '../pages/menu';
import {homeView} from '../pages/home';
import {recordView} from '../pages/record';

const AppRouter = Router.extend({
	routes: {
		'': 'begin',
		'home': 'moveHome',
		'record': 'moveRecord'
	},
	begin: function () {
		menuView.render();
		this.moveRecord();
	},
	moveHome: function () {
		homeView.render();
	},
	moveRecord: function () {
		recordView.render();
	}
});

export const router = new AppRouter();