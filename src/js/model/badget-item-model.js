define([
	'jquery',
	'underscore',
	'backbone',
], function (
	$,
	_,
	Backbone,
) {
return BadgetItem = Backbone.Model.extend({
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
	destroy: function () {
		return Backbone.Model.prototype.destroy.call(this, {data: this.id});
	},
	isValid: function () {
		return this.get('name') !== '' && this.get('value') !== null;
	},
});
});