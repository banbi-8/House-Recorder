define([
	'jquery',
	'backbone',
	'page/badget/model/badget-item-model',
	'page/badget/view/badget-table-item-view',
	'common/date-manager',
	'common/mediator',
	'text!page/badget/template/badget-table.template'
], function (
	$,
	Backbone,
	BadgetTableItem,
	BadgetTableItemView,
	// var
	dManager,
	mediator,
	template
) {
return BadgetTableView = Backbone.View.extend({
	template_: null,
	views_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.items_ = opts.items;
		this.template_ = _.template(template);

		mediator.addView('badgetTableView', this);
	},

	events: {
		'click #plus-button': 'addListItem_',
	},

	receive: function (event, opt_data) {
		switch (event) {
			case 'updatedItemValue':
				this.setBadgetSum_();
				break;
		}
	},

	// public
	render: function () {
		this.setElement(this.elSelector_);

		this.prepare_();
		this.$el.html(this.template_());
		$('tbody').empty();

		_.each((this.views_), (view) => {
			$('tbody').append(view.render());
		});

		this.adjustTBodyHeight();
		this.setBadgetSum_();
	},

	// for events
	addListItem_: function () {
		const item = new BadgetTableItem({date: dManager.getYMStr()});
		const itemView = new BadgetTableItemView(item);

		this.views_.add(itemView);
		$('tbody').append(itemView.render());
	},

	setBadgetSum_: function () {
		let sum = 0;

		_.each((this.views_), (view) => {
			sum += view.model.get('value') !== null ? view.model.get('value') : 0;
		});
		$('tfoot #badget-sum').html(sum + ' 円');
	},

	findItemViewWithModelCid_: function (cid) {
		return _.find(this.views_, (view) => {
			return view.model.cid === cid;
		});
	},

	prepare_: function () {
		this.views_ = [];
		_.each((this.items_.models), (item) => {
			const itemView = new BadgetTableItemView(item);

			this.views_.push(itemView);
		});

		while (this.items_.length < 8) {
			const item = new BadgetTableItem({date: dManager.getYMStr()});
			const itemView = new BadgetTableItemView(item);
			
			this.items_.add(item);
			this.views_.push(itemView);
		}	
	},

	adjustTBodyHeight: function () {
		const areaHeight = $('.table-container').height();
		$('.tbody').height(areaHeight - 164);
	}
});
});