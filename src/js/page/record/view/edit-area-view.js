define([
	'jquery',
	'backbone',
	'page/record/model/income-model',
	'page/record/model/expense-model',
	'page/record/view/table-item-view',
	'text!page/record/template/edit-area.template'
], function (
	$,
	Backbone,
	IncomeModel,
	ExpenseModel,
	TableItemView,
	template
) {
return EditView = Backbone.View.extend({
	template_: null,
	editItemViews_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);
		this.selector_ = 'income';
	},
	events: {
		'click #selector > label > input': 'clickOnSelector_'
	},
	render: function () {
		this.setElement(this.elSelector_);
		$(this.elSelector_).attr('showing', true);
		this.$el.html(this.template_({month: this.date_.month, date: this.date_.date}));
		this.adjustAreaHight();	

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

	prepareTableItems: function () {
		this.editItemViews_ = [];

		return $.when()
		.then(() => {
			if (this.selector_ === 'income') {
				return $.when(this.incomeItems_.fetch())
					.then(() => {
						_.each(this.incomeItems_.models, (item) => {
							const view = new TableItemView(item);
							this.editItemViews_.push(view);
						});
					});
			} else { // this.selector === expense
				return $.when(this.expenseItems_.fetch())
					.then(() => {
						_.each(this.expenseItems_.models, (item) => {
							const view = new TableItemView(item);
							this.editItemViews_.push(view);
						});	
					})
			}
		})
		.then(() => {
			while (this.editItemViews_.length < 8) {
				const attr = {};
				attr.date = `${this.date_.year}/${this.date_.month}/${this.date_.date}`;
				const model = this.selector_ === 'income' ? new IncomeModel(attr) : new ExpenseModel(attr);
				const view = new TableItemView(model);
				this.editItemViews_.push(view);
			}	
		});
	},

	updateTableItems_: function () {
		return $.when()
		.then(() => this.prepareTableItems())
		.then(() => {
			$('#edit-tbody').empty();
			_.each((this.editItemViews_), (view) => {
				$('#edit-tbody').append(view.render());
			});	
		});
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
	}
});
});