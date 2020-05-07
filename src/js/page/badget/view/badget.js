define([
	'jquery',
	'backbone',
	'common/util',
	'page/badget/view/badget-chart-view',
	'page/badget/view/badget-table-view',
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
	// var
	mediator,
	template,
) {
return BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
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
		.then(() => this.tableView_.render())
		.then(() => this.chartView_.render());	
	}
});
});