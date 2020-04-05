define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/view/month-selector',
	'page/record/view/carender-view',
	'page/record/view/edit-area-view',
	'common/mediator',
	'text!page/record/template/record.template',
], function (
	$,
	_,
	Backbone,
	MSelectorView,
	CarenderView,
	EditView,
	// var
	mediator,
	template
) {
return RecordView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.mSelectorView_ = new MSelectorView({elSelector: '.mselector-line'});
		this.carenderView_ = new CarenderView({elSelector: '.carender-container', date: this.mSelectorView_.getDate()});
		this.editAreaView_ = new EditView({elSelector: '.edit-area'});
		this.template_ = _.template(template);
		mediator.addView('recordView', this);

		this.listenTo(this.mSelectorView_, 'changedMonth', this.render);
	},

	events: {
	},

	receive: function (event, opt_data) {
		switch (event) {
			case 'clickOnEditButton':
				this.showEditView_(opt_data);
				break;
			case 'clickOnEditAreaViewCloseButton':
				this.closeEditView_();
				break;
			case 'clickOnEditItemViewSaveIcon':
				this.updateTotalValueByClickedSaveButton_();
				break;
		}
	},

	render: function () {
		this.$el.html(this.template_);
		this.mSelectorView_.render();
		this.carenderView_.render();
	},

	showEditView_: function (ctx) {
		this.editAreaView_.setCtx(ctx);
		this.carenderView_.shrink();
		this.editAreaView_.render();
	},

	closeEditView_: function () {
		this.editAreaView_.unsetCtx();
		this.carenderView_.expand();
	},

	updateTotalValueByClickedSaveButton_: function (date) {
		console.log(date);
	}
});
});