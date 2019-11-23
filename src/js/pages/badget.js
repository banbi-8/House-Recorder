import $ from 'jquery';
import {View} from 'backbone';

import {Util} from '../util/util';

const BadgetView = View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = Util.getPageContent('badget.template');
	},
	events: {
	},
	render: function () {
		this.$el.append(this.template_);
	}
});


export const badgetView = new BadgetView();