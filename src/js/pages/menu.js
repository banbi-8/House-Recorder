import $ from 'jquery';
import {View} from 'backbone';

import {Util} from '../util/util';

const MenuView = View.extend({
	el: '.header',
	template_: null,
	initialize: function() {
		this.template_ = Util.getPageContent('header.template');
	},
	events: {
	},
	render: function () {
		this.$el.append(this.template_);
	}
});


export const menuView = new MenuView();