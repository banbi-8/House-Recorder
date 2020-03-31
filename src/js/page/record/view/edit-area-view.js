define([
	'jquery',
	'backbone',
	'page/record/model/income-model',
	'page/record/model/expense-model',
	'page/record/view/table-item-view',
	'page/record/view/edit-area-detail-view',
	'text!page/record/template/edit-area.template'
], function (
	$,
	Backbone,
	IncomeModel,
	ExpenseModel,
	TableItemView,
	DetailView,
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
	},
	events: {
		'click #selector > label > input': 'clickOnSelector_',
		'click #close-button': 'clickOnCloseButton_'
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
		this.date_ = ctx.date_;
		this.incomeItems_ = ctx.incomeItems_;
		this.expenseItems_ = ctx.expenseItems_;
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
		this.incomeItemViews_ = [];

		$.when(this.incomeItems_.fetch())
		.then(() => {
			_.each(this.incomeItems_.models, (model) => {
				const view = new TableItemView(model);
				this.listenTo(view, 'updatedValue', this.updateDetailValue_);
				this.listenTo(view, 'clickedSaveIcon', this.notifyClickedSaveIcon_);
				this.incomeItemViews_.push(view);
			});

			while(this.incomeItems_.length < 8) {
				const model = new IncomeModel();
				this.incomeItems_.add(model);
				const view = new TableItemView(model);
				this.listenTo(view, 'updatedValue', this.updateDetailValue_);
				this.listenTo(view, 'clickedSaveIcon', this.notifyClickedSaveIcon_);
				this.incomeItemViews_.push(view);
			}

			dfd.resolve();
		});

		return dfd.promise();
	},

	prepareTableItemViewsForExpense_: function () {
		const dfd = $.Deferred();
		this.expenseItemViews_ = [];

		$.when(this.expenseItems_.fetch())
		.then(() => {
			_.each(this.expenseItems_.models, (model) => {
				const view = new TableItemView(model);
				this.listenTo(view, 'updatedValue', this.updateDetailValue_);
				this.listenTo(view, 'clickedSaveIcon', this.notifyClickedSaveIcon_);
				this.expenseItemViews_.push(view);
			});

			while(this.expenseItems_.length < 8) {
				const model = new ExpenseModel();
				this.expenseItems_.add(model);
				const view = new TableItemView(model);
				this.listenTo(view, 'updatedValue', this.updateDetailValue_);
				this.listenTo(view, 'clickedSaveIcon', this.notifyClickedSaveIcon_);
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

	clickOnCloseButton_: function () {
		$(this.elSelector_).attr('showing', false);
		this.$el.empty();

		this.trigger('hiddenEditView');
	},

	notifyClickedSaveIcon_: function () {
		this.trigger('clickedSaveIcon', this.date_);
	}
});
});