define([
	'jquery',
	'underscore',
	'backbone',
], function (
	$,
	_,
	Backbone,
) {
return TableItem = Backbone.Model.extend({
	urlRoot: 'src/php/badget.php',
	initialize: function (attr) {
		this.set({
			name: attr ? attr.name : '',
			value: attr ? attr.value : null,
			suppliment: attr ? attr.suppliment : '',
			date: attr ? attr.date : ''
		});
	},
});
});