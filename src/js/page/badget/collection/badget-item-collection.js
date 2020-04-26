define([
	'jquery',
	'underscore',
	'backbone',
	'page/badget/model/badget-item-model',
	'page/common/collection/collection-base'
], function (
	$,
	_,
	Backbone,
	BadgetTableItem,
	CollectionBase
) {
return BadgetTableItems= CollectionBase.extend({
	model: BadgetTableItem,
	fetch: function (opt) {	
		this.reset();	
		return $.get({
			url: 'src/php/badget.php',
			dataType: 'json',
			data: {date: opt.date},
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
			if (model.canSave()) {
				const dfd = $.Deferred();
			
				$.when(model.save())
				.then(() => dfd.resolve());
	
				dfds.push(dfd);
			}
		});

		return $.when.apply($, dfds);
	}
});
});