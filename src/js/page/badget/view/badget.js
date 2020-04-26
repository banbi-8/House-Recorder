define([
	'jquery',
	'backbone',
	'common/util',
	'page/badget/collection/badget-item-collection',
	'page/badget/view/badget-chart-view',
	'page/badget/view/badget-table-view',
	'common/date-manager',
	'common/mediator',
	'text!page/badget/template/badget.template',
	// no var
	'bootstrap',
], function (
	$,
	Backbone,
	Util,
	BadgetItemCollection,
	BadgetChartView,
	BadgetTableView,
	// var
	dManager,
	mediator,
	template,
) {
return BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.items_ = new BadgetItemCollection();
		this.tableView_ = new BadgetTableView({elSelector: '.table-container', items: this.items_});
		this.chartView_ = new BadgetChartView({elSelector: '.chart-container', items: this.items_});

		this.template_ = _.template(template);

		mediator.addView('badgetView', this);
	},

	receive: function (event, opt_data) {
		switch (event) {
			case 'rerender':
				this.render();
				break;
		};
	},

	// public
	render: function () {
		Util.spinner.show();
		this.$el.html(this.template_());

		$.when(
			Util.sleep(500), // no means
			this.items_.fetch({date: dManager.getYMStr()})
		)
		.done(() => {
			this.tableView_.render();
			this.chartView_.render();	
		})
		.always(() => Util.spinner.hide());
	}
});
});