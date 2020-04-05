define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/menu.template'
], function (
	$,
	_,
	Backbone,
	template
) {
return MenuView = Backbone.View.extend({
	el: '.header-area',
	template_: null,
	selectedTabID: 'home',
	initialize: function() {
		this.template_ = _.template(template);
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