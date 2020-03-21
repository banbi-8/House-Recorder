define([
	'jquery',
	'underscore',
	'backbone',
	'text!page/record/template/record-table-item.template'
], function (
	$,
	_,
	Backbone,
	template
) {
return TableItemView = Backbone.View.extend({
	tagName: 'tr',
	template_: null,
	initialize: function (model) {
		this.model_ = model;
		this.template_ = _.template(template);
	},
	
	events: {
		'focusout td': 'updateModelWithInputValue',
		'click #trash': 'clear'
	},

	render: function () {
		this.delegateEvents();
		return this.$el.html(this.template_());
	},

	updateModelWithInputValue: function (eve) {
		const key = eve.target.id;
		let value = eve.target.innerHTML;

		if (key === 'value') {
			value = Number(value);
		}
		this.model_.set({[key]: value});
	},

	clear: function () {
		this.model_.clear();
		this.$el.html(this.template_());
	}
});
});