define([
	'jquery',
	'underscore',
	'backbone',
	'chart',
], function (
	$,
	_,
	Backbone,
	Chart,
) {

Chart.Tooltip.positioners.custom = function(elements, position) {
	if (!elements.length) {
		return false;
	}
	const ps = elements[0].tooltipPosition();
	var offset = 0;
	//adjust the offset left or right depending on the event position
	if (elements[0]._chart.width / 2 > ps.x) {
		offset = -30;
	} else {
		offset = 30;
	}
	return {
		x: ps.x + offset,
		y: ps.y
	}
};

Chart.pluginService.register({
	beforeRender: function (chart) {
		if (chart.config.options.showAllTooltips) {
				// create an array of tooltips
				// we can't use the chart tooltip because there is only one tooltip per chart
				chart.pluginTooltips = [];
				chart.config.data.datasets.forEach(function (dataset, i) {
						chart.getDatasetMeta(i).data.forEach(function (sector, j) {
								chart.pluginTooltips.push(new Chart.Tooltip({
										_chart: chart.chart,
										_chartInstance: chart,
										_data: chart.data,
										_options: chart.options.tooltips,
										_active: [sector]
								}, chart));
						});
				});

				// turn off normal tooltips
				chart.options.tooltips.enabled = false;
		}
},
	afterDraw: function (chart, easing) {
		if (chart.config.options.showAllTooltips) {
				// we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
				if (!chart.allTooltipsOnce) {
						if (easing !== 1)
								return;
						chart.allTooltipsOnce = true;
				}

				// turn on tooltips
				chart.options.tooltips.enabled = true;
				Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
						tooltip.initialize();
						tooltip.update();
						// we don't actually need this since we are not animating tooltips
						tooltip.pivot();
						tooltip.transition(easing).draw();
				});
				chart.options.tooltips.enabled = false;
		}
	}
});

return ChartView = Backbone.View.extend({
	elSelector_: null,
	chart_: null,
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.collection_ = opts.collection;

		this.template_ = $('<canvas></canvas>');
		const ctx = this.template_[0].getContext('2d');
		this.chart_ = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: [],
					borderColor: []
				}]	
			},
			options: {
				maintainAspectRatio: false,
				responsible: true,
				showAllTooltips: true,
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 10,
						bottom: 10
					}
				},
				legend: {
					display: false
				},
				tooltips: {
					callbacks: {
						label: function (tooltipItem, chart) {
							const label = chart.labels[tooltipItem.index];
							return label;
						},
						afterLabel: function (tooltipItem, chart) {
							const value = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							return value + '円';
						},
						labelTextColor:function(tooltipItem, chart){
							return 'white';
						}
					},
					position: 'custom',
					titleFontSize: 14,
					bodyFontSize: 14,
					displayColors: false,
					backgroundColor: 'rgb(255, 255, 255, 0)'
				}
			}
		});
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_);

		this.resetChart();
		_.each(this.collection_.models, (model, i) => {
			this.chart_.data.labels.push(model.get('category'));
			this.chart_.data.datasets[0].data.push(model.get('value'));
			
			const color = this.generateColor_(i);
			this.chart_.data.datasets[0].backgroundColor.push(color);
			this.chart_.data.datasets[0].borderColor.push(color);	
		});

		this.chart_.update();
	},

	generateColor_: function (index) {
		const colors = [
			'#FF6384',
			'#36A2EB',
			'#FFCE56',
			'#339900',
			'#ff6633',
			'#0099FF',
			'#FFCC00'			
		];

		const num = index % colors.length;
		return colors[num];
	},

	resetChart: function () {
		this.chart_.data.labels = [];
		this.chart_.data.datasets[0].data = [];		
		this.chart_.data.datasets[0].backgroundColor = [];
		this.chart_.data.datasets[0].borderColor = [];	
	}
});
});