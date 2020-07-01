define([
	'jquery',
	'backbone',
	'page/common/model/income-model',
	'page/common/collection/income-collection',
	'common/date-manager',
	'common/mediator',
	'text!page/badget/template/income-total.template',
	// no var
	'bootstrap',
], function (
	$,
	Backbone,
	Income,
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
		this.model_ = null;
	},

	// public
	render: function () {
		this.setElement(this.elSelector_);

		$.when(this.collection_.fetch())
		.then(() =>{
			this.$el.html(this.template_());
			const model = this.collection_.getModelFromDate(dManager.getYMStr());
			if (model) {
				this.model_ = model;
			} else {
				this.model_ = new Income();
				this.model_.set({'date': dManager.getYMStr()});
			}
			$('#income-total').val(this.model_.get('value'));
		});
	},

	events: {
		'click #save': 'clickedOnSaveButton'
	},

	clickedOnSaveButton: function () {
		const value = $('#income-total').val();
		this.model_.set({'value': value});
		this.model_.save();
	}
});
});