define([
	'jquery',
	'underscore',
	'backbone',
	'common/util',
	'common/mediator',
	'text!page/badget/template/badget-table-item.template'
], function (
	$,
	_,
	Backbone,
	Util,
	// var
	mediator,
	template
) {
return BadgetTableItemView = Backbone.View.extend({
	tagName: 'tr',
	template_: null,
	initialize: function (model) {
		this.model = model;
		this.template_ = _.template(template);
	},
	
	events: {
		'focusout td': 'updateModelWithInputValue',
		'click #save': 'clickedOnSaveIcon',
		'click #trash': 'clickedOnTrashIcon'
	},

	render: function () {
		this.delegateEvents();
		return this.$el.html(this.template_(this.model.attributes));
	},

	updateModelWithInputValue: function (eve) {
		const key = eve.target.id;
		const value = eve.target.innerHTML;

		if (key === 'value') {
			this.model.set({[key]: Number(value)});
			mediator.send('updatedItemValue', 'badgetTableView');
			mediator.send('updatedItemValue', 'badgetChartView');
		} else {
			this.model.set({[key]: value});
		}
	},

	clickedOnSaveIcon: function () {
		$.when(Util.spinner.show())
		.then(() => {
			if (this.model.canSave()) {
				return this.model.save();
			} else {
				alert('分類または金額が入力されていないため、保存できません。');
				return $.Deferred().resolve();
			}	
		})
		.then(() => Util.spinner.hide());
	},

	clickedOnTrashIcon: function () {
		$.when(Util.spinner.show())
		.then(() => {
			const name = this.model.get('name');
			if (name !== '') {
				const isConfirmed = confirm(`${name}を削除しますか？`);
	
				if (isConfirmed) {
					this.model.destroy();
					this.model.clearAttrExceptDate();
					this.render();
					mediator.send('updatedItemValue', 'badgetTableView');
					mediator.send('removeCtx', 'badgetChartView', {cid: this.model.cid});		
				}		
			}
		})
		.then(() => Util.spinner.hide());
	}
});
});