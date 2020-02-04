define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/badget-table-item.template'
], function (
	$,
	_,
	Backbone,
	template
) {
return BadgetTableItemView = Backbone.View.extend({
	tagName: 'tr',
	template_: null,
	initialize: function (model) {
		this.model = model;
		this.template_ = _.template(template);
	},
	events: {
		'focusout td': 'updateModelWithInputValue'
	},
	html: function () {
		return this.$el.append(this.template_(this.model.attributes));
	},
	updateModelWithInputValue: function (eve) {
		const key = eve.target.id;
		const value = eve.target.innerHTML;

		this.model.set({[key]: value});
	}
});
});