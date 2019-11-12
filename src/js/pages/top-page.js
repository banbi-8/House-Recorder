import $ from 'jquery';
import {View} from 'backbone';

const TopPageView = View.extend({
	el: $('.contents'),
	events: {
	},

	render: function () {
		console.log(2);
	}
});


export const topPageView = new TopPageView();