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
		this.items_ = new TableItemCollection();
		this.template_ = _.template(template);
	},
	events: {
		'click #plus-button': 'addListItem_',
	},
	// public
	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_());
	},

	// for events
	addListItem_: function () {
		const item = new TableItem();
		const itemView = new TableItemView(item);

		this.items_.add(item);
		this.views_.push(itemView);
		$('tbody').append(itemView.html());
	},

	saveBadgetItems: function (date) {
		_.each((this.items_.models), (item) => {
			item.set({
				date: `${date.year}/${date.month}`,
				name: item.get('name'),
				badget: item.get('value'),
				suppliment: item.get('suppliment')
			});

			item.save();
		})
	}
});
});