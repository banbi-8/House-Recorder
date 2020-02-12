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
		this.date_ = opts.date;
		this.template_ = _.template(template);
		this.items_ = new BadgetTableItemCollection();

		this.listenTo(this.items_, 'updateSum' , this.setBadgetSum_);
		this.listenTo(this.items_, 'destroy', this.removeView_);
	},

	entry: function () {
		$.when(
			this.items_.fetch()
		)
		.then(() => {
			while (this.items_.length < 8) {
				this.items_.add(new TableItem());
			}

			_.each((this.items_.models), (item) => {
				const itemView = new BadgetTableItemView(item);
				this.views_.push(itemView);
			});
		})
		.then(() => this.render());
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
				date: `${this.date_.year}/${this.date_.month}`
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

	removeView_: function (eve) {
		const delView = this.findItemViewWithViewId_(eve.id);
		this.views_ = _.without(this.views_, delView);
		this.render();
	},

	findItemViewWithViewId_: function (viewId) {
		return _.find(this.views_, (view) => {
			return view.id === viewId;
		});
	}
});
});