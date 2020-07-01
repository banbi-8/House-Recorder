define([
	'jquery',
	'underscore',
	'backbone',
	'page/record/model/income-model',
	'page/common/collection/collection-base'
], function (
	$,
	_,
	Backbone,
	IncomeModel,
	CollectionBase
) {
return IncomeItems = CollectionBase.extend({
	model: IncomeModel,
	initialize: function (opt_attr = null) {
		if (opt_attr) {
			this.date_ = opt_attr.date;
		}
	},

	fetch: function () {	
		this.reset();	
		return $.get({
			url: 'src/php/income.php',
			dataType: 'json',
			data: {date: this.date_},
			success: function (attrs) {
				return attrs;
			}
		})
		.then((attrs) => {
			_.each((attrs), (attr) => {
				attr.value = Number(attr.value);
				this.add(new IncomeModel(attr));
			});
		});
	},

	save: function () {
		const dfds = [];

		_.each((this.models), (model) => {
			if (this.needsSave(model)) {
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

	getModelFromDate: function (date) {
		return this.findWhere({'date': date});
	}
});
});