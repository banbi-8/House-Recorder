define([
	'jquery',
	'backbone',
	'chart'
], function (
	$,
	Backbone,
	Chart
) {
return LineChartView = Backbone.View.extend({
	initialize: function (arg) {
		this.elSelector_ = arg.elSelector;
		this.template_ = $('<canvas></canvas>');
		const ctx = this.template_[0].getContext('2d');
		this.chart_ = new Chart (ctx, {
			type: 'line',
			data: {
				labels: [],
				datasets: [],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 20,
						bottom: 20
					}
				},
			}
		});
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_);
		this.chart_.update();
	},

	setLabels: function (labels) {
		this.chart_.data.labels = labels;
	},

	setDataset: function (dataset) {
		this.chart_.data.datasets.push(dataset);
	},

	resetDataset: function () {
		this.chart_.data.datasets = [];
	}
});
});