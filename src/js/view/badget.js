define([
	'jquery',
	'backbone',
	'view/common/month-selector',
	'view/badget-table-view',
	'text!templates/badget.template',
	// no var
	'bootstrap',
], function (
	$,
	Backbone,
	MSelectorView,
	BadgetTableView,
	template,
) {
return BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.mSelectorView_ = new MSelectorView({elSelector: '.mselector-line'});
		this.tableView_ = new BadgetTableView({elSelector: '.table-container'});

		this.template_ = _.template(template);
	},

	entry: function () {
		this.render();

		this.mSelectorView_.entry();
		this.tableView_.entry();
	},

	events: {
		'click #save': 'clickOnSaveButton'
	},
	// public
	render: function () {
		this.$el.append(this.template_());
	},
	
	// for events
	clickOnSaveButton: function () {
		const date = this.mSelectorView_.getDisplayingDate();
		this.tableView_.saveBadgetItems(date);
	}

	// private
});
});