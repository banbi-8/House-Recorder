define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/collection/badget-collection',
	'page/home/view/chart-view',
	'common/date-manager',
	'text!page/home/template/badget-col.template'
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
return BadgetColView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.collection_ = new BadgetCollection({date: dManager.getYMStr()});
		this.chartView_ = new ChartView({elSelector: '.badget-col > .container > .chart-container', collection: this.collection_});

		this.template_ = _.template(template);
	},

	events: {
	},

	render: function () {
		$.when(this.collection_.fetch())
		.then(() => {
			this.setElement(this.elSelector_);
			this.$el.html(this.template_({month: dManager.month, total: this.collection_.totalValue()}));
			this.chartView_.render();
		});
	},
});
});