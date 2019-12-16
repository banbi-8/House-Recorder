define([
	'jquery',
	'backbone',
], function (
	$,
	Backbone,
) {
const BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		Util.getTemplate('badget');
	},
	events: {
	},
	render: function () {
		this.$el.append(this.template_);
	}
});
return BadgetView;
});