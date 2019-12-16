define([
	'jquery',
	'backbone',
], function (
	$,
	Backbone,
) {
const RecordView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		Util.getTemplate('record');
	},
	events: {
	},
	render: function () {
		this.$el.append(this.template_);
	}
});
return RecordView;
});