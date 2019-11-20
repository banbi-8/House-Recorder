import $ from 'jquery';
import {View} from 'backbone';

import {Util} from '../util/util';

const Menu = View.extend({
	el: '.header',
	events: {
	},

	render: function () {
		this.$el.append(Util.getPageContent('header.template'));
	}
});


export const menu = new Menu();