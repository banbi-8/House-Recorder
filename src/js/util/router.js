import {Router} from 'backbone';

import {menuView} from '../pages/menu';
import {homeView} from '../pages/home';

const AppRouter = Router.extend({
	routes: {
		'': 'begin',
		'home': 'home'
	},
	begin: function () {
		menuView.render();
		this.home();
	},
	home: function () {
		homeView.render();
	}
});

export const router = new AppRouter();