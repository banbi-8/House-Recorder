define([
	'jquery',
	'underscore',
	'backbone',
	'model/table-item-model',
	'collection/collection-base'
], function (
	$,
	_,
	Backbone,
	TableItem,
	CollectionBase
) {
return BadgetTableItems= CollectionBase.extend({
	model: TableItem,
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
					this.add(new TableItem(attr));
				});
			});
		}
	},
});
});