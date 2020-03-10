define([
	'jquery',
	'backbone',
	'text!page/record/template/edit-area.template'
], function (
	$,
	Backbone,
	template
) {
return EditView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.dateView_ = null;
		this.template_ = _.template(template);
	},
	events: {
	},
	render: function () {
		this.setElement(this.elSelector_);
		$(this.elSelector_).attr('showing', true);

		this.$el.html(this.template_({month: this.dateView_.month, date: this.dateView_.date}));
	},

	setView: function (view) {
		this.dateView_ = view;
	}
});
});