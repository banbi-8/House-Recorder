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
	initialize: function (attr) {
		this.date_ = attr.date;
	},
	fetch: function () {	
		this.reset();	
		return $.get({
			url: 'src/php/income.php',
			dataType: 'json',
			data: {date: `${this.date_.year}/${this.date_.month}/${this.date_.date}`},
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
	needsSave: function (model) {
		let needsSave = true;

		needsSave = model.get('category') !== '' ? true : false;
		needsSave = needsSave && (model.get('value') !== null) ? true : false;
		needsSave = needsSave && (model.get('date') !== '') ? true : false;

		return needsSave;
	}
});
});