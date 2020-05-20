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
	IncomeCollection,
	ExpenseCollection,
	// var
	dManager,
	template
) {
return DetailPaneView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;

		this.incomeCollection_ = new IncomeCollection({date: dManager.getYMStr()});
		this.expenseCollection_ = new ExpenseCollection({date: dManager.getYMStr()});

		this.template_ = _.template(template);
	},

	events: {
	},

	render: function () {
		this.incomeCollection_.setDate(dManager.getYMStr());
		this.expenseCollection_.setDate(dManager.getYMStr());

		$.when(
			this.incomeCollection_.fetch(),
			this.expenseCollection_.fetch()
			)
		.then(() =>{
			const incomeVal = this.incomeCollection_.getTotalValue();
			const expenseVal = this.expenseCollection_.getTotalValue();

			this.setElement(this.elSelector_);
			this.$el.html(this.template_({
				incomeVal: incomeVal,
				expenseVal: expenseVal,
				remainVal: incomeVal - expenseVal
			}));
		});
	},
});
});