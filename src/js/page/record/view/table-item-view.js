define([
	'jquery',
	'underscore',
	'backbone',
	'common/util',
	'common/mediator',
	'text!page/record/template/record-table-item.template'
], function (
	$,
	_,
	Backbone,
	Util,
	// var
	mediator,
	template
) {
return TableItemView = Backbone.View.extend({
	tagName: 'tr',
	template_: null,
	initialize: function (model) {
		this.model_ = model;
		this.template_ = _.template(template);
	},
	
	events: {
		'focusout td': 'updateModelWithInputValue',
		'click #save': 'clickOnSaveIcon',
		'click #trash': 'clickOnTrashIcon'
	},

	render: function () {
		this.delegateEvents();
		return this.$el.html(this.template_(this.model_.attributes));
	},

	getModelCid: function () {
		return this.model_.cid;
	},

	updateModelWithInputValue: function (eve) {
		const key = eve.target.id;
		let value = eve.target.innerHTML;

		if (key === 'value') {
			const regex = /^([1-9]\d*|0)$/;
			if (regex.test(value)) {
				this.model_.set({[key]: Number(value)});
			} else {
				$.when(Util.spinner.show())
				.then(() => {
					alert('金額には数字を入力してください');
					this.$el.html(this.template_(this.model_.attributes));	
				})
				.done(() => Util.spinner.hide());
			}
		} else {
			this.model_.set({[key]: value});
		}
	},

	clickOnSaveIcon: function () {
		$.when(Util.spinner.show())
		.then(() => {
			if (this.model_.canSave()) {
				return this.model_.save()
					.then(() => {
						mediator.send('updatedItemValue', 'editAreaView');
						mediator.send('clickOnEditItemViewSaveIcon', 'carenderView', this.model_.get('date'));
					});
			} else {
				alert('分類または金額が入力されていないため、保存できません。');
				return $.Deferred().resolve();
			}	
		})
		.then(() => Util.spinner.hide());
	},

	clickOnTrashIcon: function () {
		$.when(Util.spinner.show())
		.then(() => {
			const isConfirmed = confirm('項目を削除してよろしいですか？');
	
			if (isConfirmed) {
				return this.model_.destroy()
					.then(() => {
						this.model_.clearAttrExceptDate();
						this.$el.html(this.template_(this.model_.attributes));

						mediator.send('updatedItemValue', 'editAreaView');
						mediator.send('clickOnEditItemViewTrashIcon', 'carenderView', this.model_.get('date'));
					});
			}	
		})
		.then(() => Util.spinner.hide());
	},
});
});