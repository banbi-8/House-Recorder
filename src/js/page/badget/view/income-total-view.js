define([
	'jquery',
	'backbone',
	'page/common/collection/income-collection',
	'common/date-manager',
	'common/mediator',
	'text!page/badget/template/income-total.template',
	// no var
	'bootstrap',
], function (
	$,
	Backbone,
	Incomes,
	// var
	dManager,
	mediator,
	template,
) {
return IncomeTotalView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);

		this.collection_ = new Incomes();
	},

	// public
	render: function () {
		this.setElement(this.elSelector_);

		$.when(this.collection_.fetch())
		.then(() =>{
			this.$el.html(this.template_());
			const model = this.collection_.getModelFromDate(dManager.getYMStr());
			const value = model ? model.get('value') : 0;
			$('#income-total').val(value);
		});
	},

	events: {

	},
});
});