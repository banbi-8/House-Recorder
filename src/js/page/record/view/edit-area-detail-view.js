define([
	'jquery',
	'underscore',
	'backbone',
	'common/mediator',
	'text!page/record/template/edit-area-detail.template'	
], function (
	$,
	_,
	Backbone,
	// var
	mediator,
	template
) {
return EditAreaDetailView = Backbone.View.extend({
	template_: null,
	initialize: function (opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);

		mediator.addView('editAreaDetail', this);
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_({total: this.value_}));
	},

	setValue: function (value) {
		this.value_ = {
			income: value.income,
			expense: value.expense
		}
	}
});
});