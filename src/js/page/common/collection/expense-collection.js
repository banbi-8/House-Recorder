define([
	'jquery',
	'underscore',
	'backbone',
	'page/record/model/expense-model',
	'page/common/collection/collection-base'
], function (
	$,
	_,
	Backbone,
	ExpenseItem,
	CollectionBase
) {
return IncomeItems = CollectionBase.extend({
	model: ExpenseItem,
	initialize: function (opt_attr = null) {
		if (opt_attr) {
			this.date_ = opt_attr.date;
		}
	},

	fetch: function () {	
		this.reset();	
		return $.get({
			url: 'src/php/expense.php',
			dataType: 'json',
			data: {date: this.date_},
			success: function (attrs) {
				return attrs;
			}
		})
		.then((attrs) => {
			_.each((attrs), (attr) => {
				attr.value = Number(attr.value);
				this.add(new ExpenseItem(attr));
			});
		});
	},

	save: function () {
		const dfds = [];

		_.each((this.models), (model) => {
			if (this.canSave(model)) {
				const dfd = $.Deferred();
			
				$.when(model.save())
				.then(() => dfd.resolve());
	
				dfds.push(dfd);
			}
		});

		return $.when.apply($, dfds);
	},
	
	getTotalValue: function () {
		let res = 0;
		_.each(this.models, (model) => {
			res += model.get('value');
		});

		return res;
	},

	totalValue: function () {
		let res = 0;
		_.each(this.models, (model) => {
			res += model.get('value');
		});

		return res;
	}
});
});