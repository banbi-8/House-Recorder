import {Router} from 'backbone';

import {menu} from '../pages/menu';
import {topPageView} from '../pages/top-page';

const AppRouter = Router.extend({
	routes: {
		'': 'begin',
		'top': 'top'
	},
	begin: function () {
		menu.render();
		this.top();
	},
	top: function () {
		topPageView.render();
	}
});

export const router = new AppRouter();