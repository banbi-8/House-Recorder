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
return IncomeModel = ModelBase.extend({
	urlRoot: 'src/php/income.php',
	defaults: {
		category: '',
		value: null,
		memo: '',
		date: ''
	},
	initialize: function (attr) {
		if (attr) {
			this.set({
				'category': attr.category ? attr.category : '',
				'value': attr.value ? attr.value : null,
				'memo': attr.memo ? attr.memo : '',
				'date': attr.date ? attr.date : ''
			});
		}
	},

	clearAttrExceptDate: function () {
		const dateStr = this.get('date');
		this.clear();
		this.attributes = _.clone(this.defaults);
		this.set({'date': dateStr});
	},

	canSave: function () {
		let needsSave = true;

		needsSave = this.get('category') !== '' ? true : false;
		needsSave = needsSave && (this.get('value') !== null) ? true : false;
		needsSave = needsSave && (this.get('date') !== '') ? true : false;

		return needsSave;
	},
});
});