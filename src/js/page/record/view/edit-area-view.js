define([
	'jquery',
	'backbone',
	'page/record/view/table-item-view',
	'text!page/record/template/edit-area.template'
], function (
	$,
	Backbone,
	TableItemView,
	template
) {
return EditView = Backbone.View.extend({
	template_: null,
	editItemViews_: [],
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);
	},
	events: {
	},
	render: function () {
		this.setElement(this.elSelector_);
		$(this.elSelector_).attr('showing', true);
		this.$el.html(this.template_({month: this.date_.month, date: this.date_.date}));
		this.adjustAreaHight();	

		this.prepareDisplays();
		$('#edit-tbody').empty;
		_.each((this.editItemViews_), (view) => {
			$('#edit-tbody').append(view.render());
		});
	},

	adjustAreaHight: function () {
		const areaHight = $('.edit-area').height();
		$('.table-container').height(areaHight - 183);
		$('tbody').height(areaHight - 274);
	},

	setCtx: function (ctx) {
		this.date_ = ctx.date_;
		this.incomeItems_ = ctx.incomeItems_;
	},

	prepareDisplays: function () {
		this.editItemViews_ = [];

		_.each(this.incomeItems_.models, (item) => {
			const view = new TableItemView(item);
			this.editItemViews_.push(view);
		});

		while (this.editItemViews_.length < 8) {
			const view = new TableItemView();
			this.editItemViews_.push(view);
		}
	}
});
});