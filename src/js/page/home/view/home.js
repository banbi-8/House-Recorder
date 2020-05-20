define([
	'jquery',
	'underscore',
	'backbone',
	'page/home/view/badget-pane-view',
	'page/home/view/detail-pane-view',
	'page/home/view/expense-pane-view',
	'common/mediator',
	'text!page/home/template/home.template'
], function (
	$,
	_,
	Backbone,
	BadgetPaneView,
	DetailPaneView,
	ExpensePaneView,
	mediator,
	template
) {
return HomeView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.detailPaneView_ = new DetailPaneView({elSelector: '.detail-pane'});
		this.badgetPaneView_ = new BadgetPaneView({elSelector: '.badget-pane'});
		this.expensePaneView_ = new ExpensePaneView({elSelector: '.expense-pane'});

		this.template_ = _.template(template);
		mediator.addView('homeView', this);
	},

	receive: function (event, opt_data) {
		switch (event) {
			case 'render': 
				this.render();
				break;
		}
	},

	events: {
	},

	render: function () {
		this.$el.html(this.template_);

		this.detailPaneView_.render();
		this.badgetPaneView_.render();
		this.expensePaneView_.render();
	}
});
});