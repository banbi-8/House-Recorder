define([
	'jquery',
	'backbone',
	'page/common/view/month-selector',
	'page/record/view/carender-view',
	'page/record/view/edit-area-view',
	'text!page/record/template/record.template'
], function (
	$,
	Backbone,
	MSelectorView,
	CarenderView,
	EditView,
	template
) {
return RecordView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.mSelectorView_ = new MSelectorView({elSelector: '.mselector-line'});
		this.carenderView_ = new CarenderView({elSelector: '.carender-container', date: this.mSelectorView_.getDate()});
		this.editView_ = new EditView({elSelector: '.edit-area'});
		this.template_ = template;

		this.listenTo(this.mSelectorView_, 'changedMonth', this.render);
		this.listenTo(this.carenderView_, 'showEditView', this.showEditView_);
		this.listenTo(this.editView_, 'clickedSaveIcon', this.updateTotalValueByClickedSaveButton_);
		this.listenTo(this.editView_, 'hiddenEditView', this.hiddenEditView_);
	},

	entry: function () {
		this.$el.append(this.template_);
		this.mSelectorView_.render();

		this.render();
	},

	events: {
	},

	render: function () {
		this.carenderView_.render();
	},

	showEditView_: function (selecteDateView) {
		this.editView_.setCtx(selecteDateView);
		this.carenderView_.shrink();

		this.editView_.render();
	},

	hiddenEditView_: function () {
		this.editView_.unsetCtx();
		this.carenderView_.expand();
	},

	updateTotalValueByClickedSaveButton_: function (date) {
		console.log(date);
	}
});
});