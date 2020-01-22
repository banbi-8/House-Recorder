define([
	'jquery',
	'backbone',
	'text!templates/dselector.template'
], function (
	$,
	Backbone,
	template
) {
return mSelectorView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.date = this.getCurrentDate();
		this.template_ = _.template(template);
	},
	events: {
	},
	// public
	render: function () {
		$('.dselector-line').html(this.template_(this.date));
	},

	// for events
	events: {
		'click #dselector > #previous': 'previous',
		'click #dselector > #next': 'next'
	},

	// private
	getCurrentDate: function () {
		const date = new Date();
		return {
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
	},
	previous: function () {
		if (this.date.month === 1) {
			this.date.year -= 1;
			this.date.month = 12;
		} else {
			this.date.month -= 1;
		}

		this.render();
	}
});
});