define([
	'jquery',
	'underscore',
	'backbone',
	'model/badget-item-model',
	'collection/collection-base'
], function (
	$,
	_,
	Backbone,
	BadgetTableItem,
	CollectionBase
) {
return BadgetTableItems= CollectionBase.extend({
	model: BadgetTableItem,
	fetch: function (ctx) {	
		this.reset();	
		return $.get({
			url: 'src/php/badget.php',
			dataType: 'json',
			data: {date: `${ctx.date.year}/${ctx.date.month}`},
			success: function (attrs) {
				return attrs;
			}
		})
		.then((attrs) => {
			_.each((attrs), (attr) => {
				attr.value = Number(attr.value);
				this.add(new BadgetTableItem(attr));
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

		needsSave = model.get('name') !== '' ? true : false;
		needsSave = needsSave && (model.get('value') !== null) ? true : false;
		needsSave = needsSave && (model.get('date') !== '') ? true : false;

		return needsSave;
	}
});
});