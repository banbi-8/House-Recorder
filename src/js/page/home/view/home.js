define([
	'jquery',
	'underscore',
	'backbone',
	'page/home/view/badget-col-view',
	'page/home/view/expense-col-view',
	'text!page/home/template/home.template'
], function (
	$,
	_,
	Backbone,
	BadgetColView,
	ExpenseColView,
	template
) {
return HomeView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.badgetColView_ = new BadgetColView({elSelector: '.badget-col'});
		this.expenseColView_ = new ExpenseColView({elSelector: '.expense-col'});

		this.template_ = _.template(template);
	},
	events: {
	},

	render: function () {
		this.$el.html(this.template_);

		this.badgetColView_.render();
		this.expenseColView_.render();
	}
});
});