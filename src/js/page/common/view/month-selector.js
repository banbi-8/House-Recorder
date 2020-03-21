define([
	'jquery',
	'backbone',
	'text!page/common/template/month-selector.template'
], function (
	$,
	Backbone,
	template
) {
return mSelector = Backbone.View.extend({
	elSelector_: null,
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);

		this.setDate_();
	},

	// public
	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_(this.date));
	},

	// for events
	events: {
		'click #mselector > #previous': 'previous',
		'click #mselector > #next': 'next'
	},

	// private
	setDate_: function () {
		const date = new Date();
		this.date = {
			year: date.getFullYear(),
			month: date.getMonth() + 1
		};
	},

	next: function () {
		if (this.date.month === 12) {
			this.date.year += 1;
			this.date.month = 1;
		} else {
			this.date.month += 1;
		}

		this.render();
		this.trigger('changedMonth');
	},

	previous: function () {
		if (this.date.month === 1) {
			this.date.year -= 1;
			this.date.month = 12;
		} else {
			this.date.month -= 1;
		}

		this.render();
		this.trigger('changedMonth');
	},

	getDate: function () {
		return this.date;
	}
});
});