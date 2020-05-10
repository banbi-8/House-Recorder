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

return BadgetColView = Backbone.View.extend({
	template_: null,
	initialize: function(opts) {
		this.elSelector_ = opts.elSelector;
		this.collection_ = opts.collection;

		this.template_ = $('<canvas></canvas>');
		const ctx = this.template_[0].getContext('2d');
		this.chart_ = new Chart(ctx, {
			type: 'pie',
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
						top: 20,
						bottom: 50
					}
				},
				legend: {
					display: false
				},
				tooltips: {
					callbacks: {
						label: function (tooltipItem, chart) {
							// create customized label
							const label = chart.labels[tooltipItem.index];
							const value = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							return label + ': ' + value + '円';
						}
					}
				}
			}
		});
	},

	events: {
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_);

		this.resetChart();
		_.each(this.collection_.models, (model, i) => {
			this.chart_.data.labels.push(model.get('category'));
			this.chart_.data.datasets[0].data.push(model.get('value'));
			
			const color = this.generateColor_(i);
			const backgroundOption = this.optionFormatter.backgroundColor(color);
			this.chart_.data.datasets[0].backgroundColor.push(backgroundOption);
			const borderOption = this.optionFormatter.borderColor(color);
			this.chart_.data.datasets[0].borderColor.push(borderOption);	
		});

		this.chart_.update();
	},

	generateColor_: function () {
		const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
  	const b = Math.floor(Math.random() * 255);
    return {r, g, b};
	},

	resetChart: function () {
		this.chart_.data.labels = [];
		this.chart_.data.datasets[0].data = [];		
		this.chart_.data.datasets[0].backgroundColor = [];
		this.chart_.data.datasets[0].borderColor = [];	
	},

	optionFormatter: {
		backgroundColor: function (color) {
			return `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`;			
		},
		borderColor: function (color) {
			return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
		}
	}
});
});