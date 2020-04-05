define([
	'jquery',
	'underscore',
	'backbone',
	'common/mediator',
	'text!page/badget/template/badget-table-item.template'
], function (
	$,
	_,
	Backbone,
	// var
	mediator,
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
		'focusout td': 'updateModelWithInputValue',
		'click #trash': 'destroy'
	},

	render: function () {
		this.delegateEvents();
		return this.$el.html(this.template_(this.model.attributes));
	},

	updateModelWithInputValue: function (eve) {
		const key = eve.target.id;
		const value = eve.target.innerHTML;

		if (key === 'value') {
			this.model.set({[key]: Number(value)});
			mediator.send('updatedItemValue', 'badgetTableView');
			mediator.send('updatedItemValue', 'badgetChartView');
		} else {
			this.model.set({[key]: value});
		}
	},

	destroy: function () {
		this.model.destroy();
	}
});
});