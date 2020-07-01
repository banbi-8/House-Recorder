define([
	'jquery',
	'backbone',
	'common/util',
	'page/badget/view/badget-chart-view',
	'page/badget/view/badget-table-view',
	'page/badget/view/income-total-view',
	'common/mediator',
	'text!page/badget/template/badget.template',
	// no var
	'bootstrap',
], function (
	$,
	Backbone,
	Util,
	BadgetChartView,
	BadgetTableView,
	IncomeTotalView,
	// var
	mediator,
	template,
) {
return BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.incomeTotalView_ = new IncomeTotalView({elSelector: '.income-container'});
		this.tableView_ = new BadgetTableView({elSelector: '.table-container'});
		this.chartView_ = new BadgetChartView({elSelector: '.chart-container'});

		this.template_ = _.template(template);
		mediator.addView('badgetView', this);
	},

	receive: function (event, opt_data) {
		switch (event) {
			case 'render':
				this.render();
				break;
		};
	},

	// public
	render: function () {
		this.$el.html(this.template_());

		$.when()
		.then(() => this.incomeTotalView_.render())
		.then(() => this.tableView_.render())
		.then(() => this.chartView_.render());	
	}
});
});