import $ from 'jquery';
import {View} from 'backbone';

import {Util} from '../util/util';

const MenuView = View.extend({
	el: '.header-area',
	template_: null,
	initialize: function() {
		this.template_ = Util.getPageContent('header.template');
	},
	render: function () {
		this.$el.append(this.template_);
	},
	events: {
		'click #home': 'homeTab_OnClick',
		'click #badget': 'badgetTab_OnClick',
		'click #record': 'recordTab_OnClick',
		'click #transition': 'transition_OnClick',
	},
	homeTab_OnClick: function (eve) {
		this.trigger('homeTab_OnClick', eve);
	},
	badgetTab_OnClick: function (eve) {
		this.trigger('badgetTab_OnClick', eve);
	},
	recordTab_OnClick: function (eve) {
		this.trigger('recordTab_OnClick', eve);
	},
	transition_OnClick: function (eve) {
		this.trigger('transitionTab_OnClick', eve);
	}
});


export const menuView = new MenuView();