define([
	'jquery',
	'backbone',
	'util/util',
	'text!templates/header.template'
], function (
	$,
	Backbone,
	Util,
	template
) {
return MenuView = Backbone.View.extend({
	el: '.header-area',
	template_: null,
	selectedTabID: 'home',
	initialize: function() {
		this.template_ = template;
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
});