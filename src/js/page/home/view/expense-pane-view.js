define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/collection/expense-collection',
	'page/common/view/chart-view',
	'common/date-manager',
	'text!page/home/template/expense-pane.template'
], function (
	$,
	_,
	Backbone,
	ExpenseCollection,
	ChartView,
	// var
	dManager,
	template
) {
return BadgetPaneView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.collection_ = new ExpenseCollection();
		this.chartView_ = new ChartView({elSelector: '.expense-pane > .container > .chart-container', collection: this.collection_});

		this.template_ = _.template(template);
	},

	events: {
	},

	render: function () {
		this.collection_.setDate(dManager.getYMStr());
		$.when(this.collection_.fetch())
		.then(() => {
			this.setElement(this.elSelector_);
			this.$el.html(this.template_());
			this.chartView_.render();
		});
	}
});
});