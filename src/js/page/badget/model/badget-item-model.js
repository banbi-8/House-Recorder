define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/model/model-base'
], function (
	$,
	_,
	Backbone,
	ModelBase
) {
return BadgetItem = ModelBase.extend({
	urlRoot: 'src/php/badget.php',
	initialize: function (attr) {
		this.set({
			id: _.has(attr, 'id') ? attr.id : null,
			name: _.has(attr, 'name') ? attr.name : '',
			value: _.has(attr, 'value') ? attr.value : null,
			memo: _.has(attr, 'memo') ? attr.memo : '',
			date: _.has(attr, 'date') ? attr.date : ''
		});
	},
	isValid: function () {
		return this.get('name') !== '' && this.get('value') !== null;
	},
});
});