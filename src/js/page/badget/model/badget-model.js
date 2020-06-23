define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/model/model-base',
], function (
	$,
	_,
	Backbone,
	ModelBase,
) {
return BadgetItem = ModelBase.extend({
	urlRoot: 'src/php/badget.php',
	defaults: {
		id: null,
		category: '',
		value: null,
		memo: '',
		date: ''
	},

	initialize: function (attr) {
		this.set({
			id: _.has(attr, 'id') ? attr.id : null,
			category: _.has(attr, 'category') ? attr.category : '',
			value: _.has(attr, 'value') ? attr.value : null,
			memo: _.has(attr, 'memo') ? attr.memo : '',
			date: _.has(attr, 'date') ? attr.date : ''
		});
	},

	isValid: function () {
		return this.get('category') !== '' && this.get('value') !== null;
	},

	clearAttrExceptDate: function () {
		const dateStr = this.get('date');
		this.clear();
		this.attributes = _.clone(this.defaults);
		this.set({'date': dateStr});
	},

	destroy: function () {
		Backbone.Model.prototype.destroy.call(this, {data: this.id});
	},

	canSave: function () {
		let needsSave = true;

		needsSave = this.get('category') !== '' ? true : false;
		needsSave = needsSave && (this.get('value') !== null) ? true : false;
		needsSave = needsSave && (this.get('date') !== '') ? true : false;

		return needsSave;
	}
});
});