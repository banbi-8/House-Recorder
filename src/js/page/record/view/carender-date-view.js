define([
	'jquery',
	'underscore',
	'backbone',
	'page/record/collection/income-collection',
	'page/record/collection/expense-collection',
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
		const isValidDate = arg.date > 0 && arg.date <= arg.th ? true : false;
		if (isValidDate) {
			this.date_ = dManager.createYMDStr(arg.date);
			this.incomeItems_ = new IncomeItems({date: this.date_});
			this.expenseItems_ = new ExpenseItems({date: this.date_});
		} else {
			this.date_ = '';
			this.incomeItems_ = null;
			this.expenseItems_ = null;
		}

		this.template_ = _.template(template);
	},

	render: function () {
		this.delegateEvents();

		if (this.date_ !== '') {
			return $.when(
				this.incomeItems_.fetch(),
				this.expenseItems_.fetch()
			)
			.then(() => {
				const incomeTotal = this.incomeItems_.getTotalValue();
				const expenseTotal = this.expenseItems_.getTotalValue();
				const value = incomeTotal - expenseTotal;

				const res = this.date_.split('-');
				this.$el.append(this.template_({date: res.pop(), value: value}));

				return this.$el;	
			});
		} else {
			this.$el.append(this.template_({date: '', value: ''}));
			this.$('#edit').attr('hidden', true);
			this.$('#value').attr('hidden', true);

			return this.$el;
		}
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