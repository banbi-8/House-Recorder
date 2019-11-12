import $ from 'jquery';
import {View} from 'backbone';

import {Util} from '../util/util';

const Menu = View.extend({
	el: '.menu-bar',
	events: {
	},

	render: function () {
		this.$el.append(Util.getPageContent('menu.template'));
	}
});


export const menu = new Menu();