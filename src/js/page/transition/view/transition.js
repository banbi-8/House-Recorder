define([
	'jquery',
	'backbone',
	'page/common/model/income-model',
	'page/common/collection/expense-collection',
	'page/common/view/line-chart-view',
	'common/date-manager',
	'text!page/transition/template/transition.template'
], function (
	$,
	Backbone,
	IncomeModel,
	ExpenseCollection,
	LineChartView,
	dManager,
	template
) {
return TransitionView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	initialize: function() {
		this.template_ = template;

		this.incomModel_ = new IncomeModel();
		this.expenseCollection_ = new ExpenseCollection();
		this.lineChart_ = new LineChartView({elSelector: '.chart-container'});
	},

	events: {
	},

	render: function () {
		this.$el.html(this.template_);

		$.when(
			this.createIncomeDataSets(),
			this.createExpenseDataSets()
		)
		.then((income, expense) => {
			this.lineChart_.resetDataset();
			this.lineChart_.setLabels(this.createChartLabels());
			this.lineChart_.setDataset(income);
			this.lineChart_.setDataset(expense);
			this.lineChart_.render();
		});
	},

	createIncomeDataSets: function () {
		let dataset = {};
		dataset.label = '収入';
		dataset.backgroundColor = 'rgba(60, 160, 220, 0.3)';
		dataset.borderColor = 'rgba(60, 160, 220, 0.8)';

		return $.when(
				this.createIncomeData()
			)
			.then((data) => {
				dataset.data = data;
				return dataset;
			});
	},

	createExpenseDataSets: function () {
		let dataset = {};
		dataset.label = '支出';
		dataset.backgroundColor = 'rgba(60, 190, 20, 0.3)';
		dataset.borderColor = 'rgba(60, 190, 20, 0.8)';

		return $.when(
				this.createExpenseData()
			)
			.then((data) => {
				dataset.data = data;
				return dataset;
			});
	},

	createChartLabels: function () {
		const year = dManager.year;
		const labels = [];

		for (let index = 1; index <= 12; index++) {
			const str = String(year) + '年' + String(index) + '月';
			labels.push(str);
		}

		return labels;
	},

	createIncomeData: function () {
		const dfds = [];
		const data = [];

		for (let index = 1; index <= 12; index++) {
			const prms = $.when.apply($,dfds)
				.then(() => {
					const ym = String(dManager.year + '-' + index);
					this.incomCollection_.setDate(ym);
					return this.incomCollection_.fetch();
				})
				.done(() => {
					data.push(this.incomCollection_.getTotalValue());
				});
			
			dfds.push(prms);
		}

		return $.when.apply($, dfds)
			.then(() => data);
	},

	createExpenseData: function () {
		const dfds = [];
		const data = [];

		for (let index = 1; index <= 12; index++) {
			const prms = $.when.apply($,dfds)
				.then(() => {
					const ym = String(dManager.year + '-' + index);
					this.expenseCollection_.setDate(ym);
					return this.expenseCollection_.fetch();
				})
				.done(() => {
					data.push(this.expenseCollection_.getTotalValue());
				});
			
			dfds.push(prms);
		}

		return $.when.apply($, dfds)
			.then(() => data);
	}

});
});