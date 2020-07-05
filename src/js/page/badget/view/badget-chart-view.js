define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/view/doughnut-chart-view',	
	'common/mediator'
], function (
	$,
	_,
	Backbone,
	ChartView,
	// var
	mediator
) {
return BadgetChartView = ChartView.extend({
	initialize: function (opts) {
		this.elSelector_ = opts.elSelector;
		this.tableViews_ = [];

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
						top: 50,
						bottom: 50
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
		this.chart_.displayingIDs = [];
		mediator.addView('badgetChartView', this);
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_);
		this.resetChart();
		this.updateChartContext_();
	},

	receive: function (event, opt_data) {
		switch (event) {
			case 'removeCtx':
				this.removeChartContext_(opt_data.cid);
				break;
			case 'updatedItemValue':
				this.render();
				break;
			case 'setDisplayingTableViews':
				this.tableViews_ = opt_data;
				break;
		}
	},

	updateChartContext_: function () {
		_.each(this.tableViews_, (view, i) => {
			const model = view.model;
			if (model.isValid()) {
				const index = this.chart_.displayingIDs.indexOf(model.cid);
				if (index >= 0) {
					this.chart_.data.labels[index] = model.get('category');
					this.chart_.data.datasets[0].data[index] = model.get('value');					
				} else {
					this.chart_.displayingIDs.push(model.cid);
					this.chart_.data.labels.push(model.get('category'));
					this.chart_.data.datasets[0].data.push(model.get('value'));
					
					const color = this.generateColor_(i);
					this.chart_.data.datasets[0].backgroundColor.push(color);
					this.chart_.data.datasets[0].borderColor.push(color);	
				}
			}
		});

		if (this.chart_.displayingIDs.length == 0) {
			this.chart_.options.showAllTooltips = false;
			this.chart_.data.datasets[0].data.push(1);
			const color = '#8f8f8f'; // gray
			this.chart_.data.datasets[0].backgroundColor.push(color);
			this.chart_.data.datasets[0].borderColor.push(color);		
		}

		this.chart_.update();
	},

	removeChartContext_: function (cid) {
		const index = this.chart_.displayingIDs.indexOf(cid);
		if (index !== -1) {
			this.chart_.displayingIDs.splice(index, 1);
			this.chart_.data.labels.splice(index, 1);
			this.chart_.data.datasets[0].data.splice(index, 1);
			this.chart_.data.datasets[0].backgroundColor.splice(index, 1);
			this.chart_.data.datasets[0].borderColor.splice(index, 1);	
		}

		this.chart_.update();
	},

	resetChart: function () {
		this.chart_.displayingIDs = [];
		this.chart_.data.labels = [];
		this.chart_.data.datasets[0].data = [];		
		this.chart_.data.datasets[0].backgroundColor = [];
		this.chart_.data.datasets[0].borderColor = [];
		this.chart_.options.showAllTooltips = true;	
	}
});
})