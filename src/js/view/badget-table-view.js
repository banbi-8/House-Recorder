define([
	'jquery',
	'backbone',
	'model/badget-table-item-model',
	'collection/badget-table-item-collection',
	'view/badget-table-item-view',
	'text!templates/badget-table.template'
], function (
	$,
	Backbone,
	BadgetTableItem,
	BadgetTableItemCollection,
	BadgetTableItemView,
	template
) {
return BadgetTableView = Backbone.View.extend({
	elSelector_: null,
	template_: null,
	views_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);
		this.items_ = new BadgetTableItemCollection();
	},

	entry: function () {
		this.setElement(this.elSelector_);

		$.when(
			this.items_.fetch()
		)
		.then(() => {
			// prepare table items to suitable display.
			while (this.items_.length < 8) {
				this.items_.add(new TableItem());
			}
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
			const itemView = new BadgetTableItemView(item);
			$('tbody').append(itemView.html());
		});

	},

	// for events
	addListItem_: function () {
		const item = new BadgetTableItem();
		const itemView = new BadgetTableItemView(item);

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