define([
	'jquery',
	'backbone',
	'collection/badget-item-collection',
	'view/common/month-selector',
	'view/badget-chart-view',
	'view/badget-table-view',
	'text!templates/badget.template',
	// no var
	'bootstrap',
], function (
	$,
	Backbone,
	BadgetItemCollection,
	MSelectorView,
	BadgetChartView,
	BadgetTableView,
	template,
) {
return BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.items_ = new BadgetItemCollection();
		this.mSelectorView_ = new MSelectorView({elSelector: '.mselector-line'});
		this.tableView_ = new BadgetTableView({elSelector: '.table-container', date: this.mSelectorView_.getDate(), items: this.items_});
		this.chartView_ = new BadgetChartView({elSelector: '.chart-container', items: this.items_});

		this.template_ = _.template(template);
	},

	entry: function () {
		this.$el.append(this.template_());

		$.when(
			this.items_.fetch()
		)
		.done(() => {
			this.mSelectorView_.entry();
			this.tableView_.entry();
			this.chartView_.entry();	
		});
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