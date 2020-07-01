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
		value: 0,
		date: ''
	},

	clearAttrExceptDate: function () {
		const dateStr = this.get('date');
		this.clear();
		this.attributes = _.clone(this.defaults);
		this.set({'date': dateStr});
	},

	canSave: function () {
		let needsSave = true;

		needsSave = needsSave && (this.get('value') !== null) ? true : false;
		needsSave = needsSave && (this.get('date') !== '') ? true : false;

		return needsSave;
	},
});
});