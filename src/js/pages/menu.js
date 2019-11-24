import $ from 'jquery';
import {View} from 'backbone';

import {Util} from '../util/util';

const MenuView = View.extend({
	el: '.header-area',
	template_: null,
	selectedTabID: 'home',
	initialize: function() {
		this.template_ = Util.getPageContent('header.template');
	},
	render: function () {
		this.$el.append(this.template_);
	},
	events: {
		'click li': 'tab_OnClick'
	},
	tab_OnClick: function (eve) {
		this.updateTabsAttr(eve.target.id);
		this.trigger('tab_OnClick', eve);
	},
	updateTabsAttr: function (id) {
		$(`#${this.selectedTabID}`).removeClass('active');
		
		this.selectedTabID = id;
		$(`#${this.selectedTabID}`).addClass('active');
	}
});


export const menuView = new MenuView();