import $ from 'jquery';
import {View} from 'backbone';

const TopPageView = View.extend({
	el: '.contents',
	events: {
	},

	render: function () {
		//this.$el.append(Util.getPageContent('top.template'));
	}
});


export const topPageView = new TopPageView();