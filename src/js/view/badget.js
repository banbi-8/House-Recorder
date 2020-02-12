define([
	'jquery',
	'backbone',
	'view/common/month-selector',
	'view/badget-table-view',
	'text!templates/badget.template',
	// no var
	'bootstrap',
], function (
	$,
	Backbone,
	MSelectorView,
	BadgetTableView,
	template,
) {
return BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.mSelectorView_ = new MSelectorView({elSelector: '.mselector-line'});
		this.tableView_ = new BadgetTableView({elSelector: '.table-container', date: this.mSelectorView_.getDate()});

		this.template_ = _.template(template);
	},

	entry: function () {
		this.$el.append(this.template_());
		this.mSelectorView_.entry();
		this.tableView_.entry();
	},

	events: {
	},
	
	// public
	render: function () {
		this.mSelectorView_.render();
		this.tableView_.render();
	},
	
	// for events

	// private
});
});