define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/collection/income-collection',
	'page/common/collection/expense-collection',
	'common/date-manager',
	'text!page/home/template/detail-pane.template'
], function (
	$,
	_,
	Backbone,
	Incomes,
	Expenses,
	// var
	dManager,
	template
) {
return DetailPaneView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;

		this.incomes_ = new Incomes();
		this.expenses_ = new Expenses();

		this.template_ = _.template(template);
	},

	events: {
	},

	render: function () {
		this.incomes_.setDate(dManager.getYMStr());
		this.expenses_.setDate(dManager.getYMStr());

		$.when(
			this.incomes_.fetch(),
			this.expenses_.fetch()
		)
		.then(() =>{
			const imodel = this.incomes_.findWhere({date: dManager.getYMStr()});
			const iVal = imodel ? imodel.get('value') : 0;
			const eVal = this.expenses_.getTotalValue();

			this.setElement(this.elSelector_);
			this.$el.html(this.template_({
				incomeVal: iVal,
				expenseVal: eVal,
				remainVal: iVal - eVal
			}));
		});
	},
});
});