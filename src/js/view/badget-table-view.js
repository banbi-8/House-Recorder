define([
	'jquery',
	'backbone',
	'model/badget-item-model',
	'view/badget-table-item-view',
	'text!templates/badget-table.template'
], function (
	$,
	Backbone,
	BadgetTableItem,
	BadgetTableItemView,
	template
) {
return BadgetTableView = Backbone.View.extend({
	template_: null,
	views_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.date_ = opts.date;
		this.items_ = opts.items;
		this.template_ = _.template(template);

		this.listenTo(this.items_, 'updatedValue', this.setBadgetSum_);
	},

	events: {
		'click #plus-button': 'addListItem_',
		'click #save': 'saveBadgetItems_'
	},

	// public
	render: function () {
		this.setElement(this.elSelector_);

		this.prepare_();
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

		this.views_.add(itemView);
		$('tbody').append(itemView.render());
	},

	saveBadgetItems_: function () {
		const dfds = [];
		_.each((this.items_.models), (item) => {
			if (item.isValid()) {
				const dfd = $.Deferred();
				item.set({
					date: `${this.date_.year}/${this.date_.month}`
				});
				
				$.when(item.save())
				.then(() => dfd.resolve());

				dfds.push(dfd);
			}
		});

		return $.when.apply($, dfds);
	},

	setBadgetSum_: function () {
		let sum = 0;

		_.each((this.views_), (view) => {
			sum += view.model.get('value') !== null ? view.model.get('value') : 0;
		});
		$('tfoot #badget-sum').html(sum + ' 円');
	},

	removeView_: function (eve) {
		const delView = this.findItemViewWithCid_(eve.cid);
		this.views_ = _.without(this.views_, delView);
		this.render();
	},

	findItemViewWithCid_: function (cid) {
		return _.find(this.views_, (view) => {
			return view.model.cid === cid;
		});
	},

	prepare_: function () {
		this.views_ = [];
		_.each((this.items_.models), (item) => {
			const itemView = new BadgetTableItemView(item);

			this.views_.push(itemView);

			this.listenTo(item, 'destroy', this.removeView_);
		});

		while (this.items_.length < 20) {
			const item = new BadgetTableItem();
			const itemView = new BadgetTableItemView(item);
			
			this.items_.add(item);
			this.views_.push(itemView);

			this.listenTo(item, 'destroy', this.removeView_);
		}	
	},
});
});