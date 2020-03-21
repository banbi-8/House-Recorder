define([
	'jquery',
	'underscore',
	'backbone'
], function (
	$,
	_,
	Backbone,
) {
return CollectionBase = Backbone.Collection.extend({
	save: function () {
		const dfds = [];
		_.each((this.models), (model) => {
			const dfd = $.Deferred();
			
			$.when(model.save())
			.then(() => dfd.resolve());

			dfds.push(dfd);
		});

		return $.when.apply($, dfds);
	}
});
});