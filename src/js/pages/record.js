import $ from 'jquery';
import {View} from 'backbone';

import {Util} from '../util/util';

const RecordView = View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = Util.getPageContent('record.template');
	},
	events: {
	},
	render: function () {
		this.$el.append(this.template_);
	}
});


export const recordView = new RecordView();