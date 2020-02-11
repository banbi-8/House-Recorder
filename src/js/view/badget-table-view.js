define([
	'jquery',
	'backbone',
	'model/badget-table-item-model',
	'collection/badget-table-item-collection',
	'view/badget-table-item-view',
	'util/util',
	'text!templates/badget-table.template'
], function (
	$,
	Backbone,
	BadgetTableItem,
	BadgetTableItemCollection,
	BadgetTableItemView,
	Util,
	template
) {
return BadgetTableView = Backbone.View.extend({
	template_: null,
	views_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);
		this.items_ = new BadgetTableItemCollection();

		this.listenTo(this.items_, 'updatedSum' , this.setBadgetSum_);
		this.listenTo(this.items_, 'destroy', this.deleteItem);

		$.when(
			this.items_.fetch()
		)
		.then(() => {
			// prepare table items to suitable display.
			while (this.items_.length < 8) {
				this.items_.add(new TableItem());
			}

			_.each((this.items_.models), (item) => {
				const itemView = new BadgetTableItemView(item);
				this.views_.push(itemView);
			});
		});
	},

	events: {
		'click #plus-button': 'addListItem_',
		'click #save': 'saveBadgetItems_'
	},

	// public
	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_());
		$('tbody').empty;

		_.each((this.views_), (view) => {
			$('tbody').append(view.render());
		});

		this.setBadgetSum_();
	},

	// for events
	addListItem_: function () {
		const item = new BadgetTableItem();
		const itemView = new BadgetTableItemView(item);

		this.items_.add(item);
		$('tbody').append(itemView.render());
	},

	saveBadgetItems_: function () {
		_.each((this.items_.models), (item) => {
			item.set({
				date: `${this.date.year}/${this.date.month}`
			});
		});

		this.items_.save();
	},

	setBadgetSum_: function () {
		let sum = 0;

		_.each((this.items_.models), (item) => {
			sum += item.get('value') !== null ? item.get('value') : 0;
		});
		$('tfoot #badget-sum').html(sum + ' 円');
	},

	deleteItem: function (eve) {
		this.views_ = _.without(this.views_, this.findItemViewWithViewId(eve.id));
		this.render();
	},

	findItemViewWithViewId: function (viewId) {
		return _.find(this.views_, (view) => {
			return view.id === viewId;
		});
	}
});
});