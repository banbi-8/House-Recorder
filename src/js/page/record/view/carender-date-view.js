define([
	'jquery',
	'underscore',
	'backbone',
	'page/record/collection/income-collection',
	'page/record/view/edit-view',
	'text!page/record/template/carender-date.template'	
], function (
	$,
	_,
	Backbone,
	IncomeItems,
	EditView,
	template
) {
return CarenderView = Backbone.View.extend({
	tagName: 'td',
	template_: null,
	initialize: function (arg) {
		this.date_ = arg.date;
		this.th_ = arg.th;

		this.template_ = _.template(template);
		this.editView_ = new EditView({elSelector: '.edit-area'});
		this.incomeItems_ = new IncomeItems({date: this.date_});
	},

	render: function () {
		this.delegateEvents();
		
		return $.when(
			this.incomeItems_.fetch()
		)
		.then(() => {
			const date = this.date_.date > 0 && this.date_.date <= this.th_ ? String(this.date_.date) : '';
			this.$el.append(this.template_({date: date, value: 200}));
			if (date === '') {
				this.$('#edit').attr('hidden', true);
				this.$('#value').attr('hidden', true);
			}
			return this.$el;	
		})
	},

	events: {
		'click #edit': 'clickedEditButton'
	},

	clickedEditButton: function () {
		this.trigger('clickedEditButton', this.cid);
	}
});
});