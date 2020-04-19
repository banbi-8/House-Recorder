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
return ExpenseModel = ModelBase.extend({
	urlRoot: 'src/php/expense.php',
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
	}
});
});