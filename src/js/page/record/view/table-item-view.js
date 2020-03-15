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
return RecordTableItemView = Backbone.View.extend({
	tagName: 'tr',
	template_: null,
	initialize: function (model) {
		if (model) {
			this.model_ = model;
		}
		this.template_ = _.template(template);
	},
	
	events: {
		'focusout td': 'updateModelWithInputValue',
		'click #delete': 'destroy'
	},

	render: function () {
		this.delegateEvents();
		return this.$el.html(this.template_());
	},

	updateModelWithInputValue: function (eve) {
	},

	destroy: function () {
	}
});
});