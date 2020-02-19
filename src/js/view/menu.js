define([
	'jquery',
	'backbone',
	'text!templates/menu.template'
], function (
	$,
	Backbone,
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
		'click li': 'tabOnClick'
	},
	tabOnClick: function (eve) {
		this.updateTabsAttr(eve.target.id);
		this.trigger('tabOnClick', eve);
	},
	updateTabsAttr: function (id) {
		$(`#${this.selectedTabID}`).removeClass('active');
		
		this.selectedTabID = id;
		$(`#${this.selectedTabID}`).addClass('active');
	}
});
});