define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/collection/badget-collection',
	'page/common/view/doughnut-chart-view',
	'common/date-manager',
	'text!page/home/template/badget-pane.template'
], function (
	$,
	_,
	Backbone,
	BadgetCollection,
	ChartView,
	// var
	dManager,
	template
) {
return BadgetPaneView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.collection_ = new BadgetCollection();
		this.chartView_ = new ChartView({elSelector: '.badget-pane > .container > .chart-container', collection: this.collection_});

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
	},
});
});