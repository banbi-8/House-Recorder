define([
	'jquery',
	'backbone',
	'model/table-item-model',
	'collection/table-item-collection',
	'view/badget-table-item-view',
	'util/db',
	'text!templates/badget-table.template'
], function (
	$,
	Backbone,
	TableItem,
	TableItemCollection,
	TableItemView,
	DB,
	template
) {
return BadgetTableView = Backbone.View.extend({
	elSelector_: null,
	template_: null,
	views_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);
		this.items_ = new TableItemCollection();
	},

	entry: function () {
		this.setElement(this.elSelector_);

		$.when(
			this.items_.fetch()
		)
		.then(() => {
			this.render();
		});
	},

	events: {
		'click #plus-button': 'addListItem_',
	},

	// public
	render: function () {
		this.$el.html(this.template_());

		$('tbody').empty();
			
		_.each((this.items_.models), (item) => {
			const itemView = new TableItemView(item);
			$('tbody').append(itemView.html());
		});

	},

	// for events
	addListItem_: function () {
		const item = new TableItem();
		const itemView = new TableItemView(item);

		this.items_.add(item);
		$('tbody').append(itemView.html());
	},

	saveBadgetItems: function (date) {
		_.each((this.items_.models), (item) => {
			item.set({
				date: `${date.year}/${date.month}`
			});
		});

		this.items_.save();
	}
});
});