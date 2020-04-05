define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/model/model-base',
	'common/mediator',
], function (
	$,
	_,
	Backbone,
	ModelBase,
	// var
	mediator
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
	destroy: function () {
		Backbone.Model.prototype.destroy.call(this, {data: this.id});
		mediator.send('destroy', 'badgetTableView', {cid: this.cid});
		mediator.send('destroy', 'badgetChartView', {cid: this.cid});
	}
});
});