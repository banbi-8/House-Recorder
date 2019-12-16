define([
	'jquery',
	'backbone',
	'util/util'
], function (
	$,
	Backbone,
	Util
) {
const MenuView = Backbone.View.extend({
	el: '.header-area',
	template_: null,
	selectedTabID: 'home',
	initialize: function() {
		Util.getTemplate();
		//this.template_ = temp;
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

return MenuView;
});