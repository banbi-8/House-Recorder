define([
	'jquery',
	'underscore',
	'backbone',
	'model/badget-table-item-model',
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
	fetch: function () {		
		if (this.length > 0) {
			// fetch correspond models.
			const dfds = [];

			_.each((this.models), (model) => {
				const dfd = $.Deferred();
				
				$.when(model.fetch())
				.then(() => dfd.resolve());
	
				dfds.push(dfd);
			});
	
			return $.when.apply($, dfds);
		} else {
			return $.get({
				url: 'src/php/badget.php',
				dataType: 'json',
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
		}
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