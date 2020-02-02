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
	initialize: function () {
		const attr = {
			date: '',
			name: '',
			value: null,
			suppliment: ''
		};

		this.set(attr);
	},
});
});