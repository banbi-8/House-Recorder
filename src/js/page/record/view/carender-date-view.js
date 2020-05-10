define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/collection/income-collection',
	'page/common/collection/expense-collection',
	'common/date-manager',
	'common/mediator',
	'text!page/record/template/carender-date.template'	
], function (
	$,
	_,
	Backbone,
	IncomeItems,
	ExpenseItems,
	// var
	dManager,
	mediator,
	template
) {
return CarenderView = Backbone.View.extend({
	tagName: 'td',
	template_: null,
	initialize: function (arg) {
		this.isValidDate_ = arg.date > 0 && arg.date <= arg.th ? true : false;

		this.date_ = dManager.createYMDStr(arg.date);
		this.incomeItems_ = new IncomeItems({date: this.date_});
		this.expenseItems_ = new ExpenseItems({date: this.date_});

		this.template_ = _.template(template);
	},

	render: function () {
		this.delegateEvents();

		return $.when(
			this.isValidDate_ ? this.incomeItems_.fetch() : null,
			this.isValidDate_ ? this.expenseItems_.fetch() : null
		)
		.then(() => {
			if (this.isValidDate_) {
				const incomeTotal = this.incomeItems_.getTotalValue();
				const expenseTotal = this.expenseItems_.getTotalValue();
				const value = incomeTotal - expenseTotal;

				const res = this.date_.split('-');
				this.$el.html(this.template_({date: res.pop(), value: value}));

				if (value < 0) {
					this.$('#value').css('color', 'red');
				} else if (value > 0) {
					this.$('#value').css('color', 'blue');
				}
			} else {
				this.$el.html(this.template_({date: '', value: ''}));
				this.$('#edit').attr('hidden', true);
				this.$('#value').attr('hidden', true);
			}

			return this.$el;
		});
	},

	events: {
		'click #edit': 'clickOnEditButton'
	},

	clickOnEditButton: function () {
		mediator.send('clickOnEditButton', 'recordView', {
			date: this.date_,
			incomeItems: this.incomeItems_,
			expenseItems: this.expenseItems_
		});
	}
});
});