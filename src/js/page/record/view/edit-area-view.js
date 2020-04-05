define([
	'jquery',
	'backbone',
	'page/record/model/income-model',
	'page/record/model/expense-model',
	'page/record/view/table-item-view',
	'page/record/view/edit-area-detail-view',
	'common/mediator',
	'text!page/record/template/edit-area.template'
], function (
	$,
	Backbone,
	IncomeModel,
	ExpenseModel,
	TableItemView,
	DetailView,
	// var
	mediator,
	template
) {
return EditAreaView = Backbone.View.extend({
	template_: null,
	incomeItemViews_: [],
	expenseItemViews_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);
		this.detailView_ = new DetailView({elSelector: '#detail'});
		this.selector_ = 'income';

		mediator.addView('editAreaView', this);
	},

	events: {
		'click #selector > label > input': 'clickOnSelector_',
		'click #close-button': 'clickOnEditAreaViewCloseButton_'
	},

	receive: function (event, opts) {
		switch (event) {
			case 'updatedItemValue':
				this.updateDetailValue_();
				break;
		}
	},

	render: function () {
		this.setElement(this.elSelector_);

		$(this.elSelector_).attr('showing', true);
		this.$el.html(this.template_({month: this.date_.month, date: this.date_.date}));
		this.adjustAreaHight();	

		this.updateDetailValue_();
		this.updateTableItems_();
	},

	adjustAreaHight: function () {
		const areaHight = $('.edit-area').height();
		$('.table-container').height(areaHight - 183);
		$('.tbody').height(areaHight - 274);
	},

	setCtx: function (ctx) {
		this.date_ = ctx.date;
		this.incomeItems_ = ctx.incomeItems;
		this.expenseItems_ = ctx.expenseItems;
	},

	unsetCtx: function () {
		this.date_ = null;
		this.incomeItems_ = null;
		this.expenseItems_ = null;
	},

	updateTableItems_: function () {
		return $.when(
			this.prepareTableItemViewsForIncome_(),
			this.prepareTableItemViewsForExpense_()
		)
		.then(() => {
			$('#edit-tbody').empty();
			const dispViews = this.selector_ === 'income' ? this.incomeItemViews_ : this.expenseItemViews_;
			_.each((dispViews), (view) => {
				$('#edit-tbody').append(view.render());
			});	
		});
	},

	prepareTableItemViewsForIncome_: function () {
		const dfd = $.Deferred();
		const dateStr = `${this.date_.year}/${this.date_.month}/${this.date_.date}`;
		this.incomeItemViews_ = [];

		$.when(this.incomeItems_.fetch())
		.then(() => {
			_.each(this.incomeItems_.models, (model) => {
				const view = new TableItemView(model);
				this.incomeItemViews_.push(view);
			});

			while(this.incomeItems_.length < 8) {
				const model = new IncomeModel({date: dateStr});
				this.incomeItems_.add(model);
				const view = new TableItemView(model);
				this.incomeItemViews_.push(view);
			}

			dfd.resolve();
		});

		return dfd.promise();
	},

	prepareTableItemViewsForExpense_: function () {
		const dfd = $.Deferred();
		const dateStr = `${this.date_.year}/${this.date_.month}/${this.date_.date}`;
		this.expenseItemViews_ = [];

		$.when(this.expenseItems_.fetch())
		.then(() => {
			_.each(this.expenseItems_.models, (model) => {
				const view = new TableItemView(model);
				this.expenseItemViews_.push(view);
			});

			while(this.expenseItems_.length < 8) {
				const model = new ExpenseModel({date: dateStr});
				this.expenseItems_.add(model);
				const view = new TableItemView(model);
				this.expenseItemViews_.push(view);
			}

			dfd.resolve();
		});

		return dfd.promise();
	},

	clickOnSelector_: function (eve) {
		const value = $(eve.target).attr('value');
		if (!this.isChangedSelector_(value)) {
			return;
		}
		
		this.selector_ = value;
		this.updateTableItems_();
	},

	isChangedSelector_: function (value) {
		return this.selector_ !== value;
	},

	updateDetailValue_: function () {
		this.detailView_.setValue({
			income: this.incomeItems_.getTotalValue(),
			expense: this.expenseItems_.getTotalValue()
		});
		this.detailView_.render();
	},

	clickOnEditAreaViewCloseButton_: function () {
		$(this.elSelector_).attr('showing', false);
		this.$el.empty();

		mediator.send('clickOnEditAreaViewCloseButton', 'recordView');
	}
});
});