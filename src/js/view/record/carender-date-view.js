define([
	'jquery',
	'underscore',
	'backbone',
	'view/record/edit-view',
	'text!templates/record/carender-date.template'	
], function (
	$,
	_,
	Backbone,
	EditView,
	template
) {
return CarenderView = Backbone.View.extend({
	tagName: 'td',
	template_: null,
	initialize: function (arg) {
		this.month = arg.month;
		this.date = arg.date;
		this.th_ = arg.th;

		this.template_ = _.template(template);
		this.editView_ = new EditView({elSelector: '.edit-area'});
	},

	render: function () {
		this.delegateEvents();
		const date = this.date > 0 && this.date <= this.th_ ? String(this.date) : '';
		
		this.$el.append(this.template_({date: date, value: 200}));
		if (date === '') {
			this.$('#edit').attr('hidden', true);
			this.$('#value').attr('hidden', true);
		}
		return this.$el;
	},

	events: {
		'click #edit': 'clickedEditButton'
	},

	clickedEditButton: function () {
		this.trigger('clickedEditButton', this.cid);
	}
});
});