define([
	'jquery',
	'backbone',
	'common/date-manager',
	'common/mediator',
	'text!page/common/template/month-selector.template'
], function (
	$,
	Backbone,
	// var
	dManager,
	mediator,
	template
) {
return mSelector = Backbone.View.extend({
	elSelector_: null,
	template_: null,
	date_: {},
	initialize: function(ctx) {
		this.elSelector_ = ctx.elSelector;
		this.template_ = _.template(template);

		const date = new Date();
		dManager.year = date.getFullYear();
		dManager.month = date.getMonth() + 1;

		mediator.addView('monthSelectorView', this);
	},

	// public
	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_(dManager.dataset));
	},

	// for events
	events: {
		'click #mselector > #previous': 'previous',
		'click #mselector > #next': 'next'
	},

	// private
	next: function () {
		if (dManager.month === 12) {
			dManager.year += 1;
			dManager.month = 1;
		} else {
			dManager.month += 1;
		}

		this.render();
		this.trigger('chanagedMonth');
	},

	previous: function () {
		if (dManager.month === 1) {
			dManager.year -= 1;
			dManager.month = 12;
		} else {
			dManager.month -= 1;
		}

		this.render();
		this.trigger('chanagedMonth');
	}
});
});