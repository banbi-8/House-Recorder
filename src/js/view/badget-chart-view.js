define([
	'jquery',
	'underscore',
	'backbone',
	'chart'
], function (
	$,
	_,
	Backbone,
	Chart
) {
return BadgetChartView = Backbone.View.extend({
	elSelector_: null,
	chart_: null,
	initialize: function (opts) {
		this.elSelector_ = opts.elSelector;
		this.items_ = opts.items;

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
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 50,
						bottom: 50
					}
				}
			}
		});
		this.chart_.displayingIDs = [];

		this.listenTo(this.items_, 'updatedValue', this.updateChartContext_);
		this.listenTo(this.items_, 'destroy', this.removeChartContext_);
	},

	entry: function () {
		this.render();
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_);
		this.updateChartContext_();
	},

	updateChartContext_: function () {
		_.each(this.items_.models, (item) => {
			if (item.isValid()) {
				const index = this.chart_.displayingIDs.indexOf(item.cid);
				if (index >= 0) {
					this.chart_.data.labels[index] = item.get('name');
					this.chart_.data.datasets[0].data[index] = item.get('value');					
				} else {
					this.chart_.displayingIDs.push(item.cid);
					this.chart_.data.labels.push(item.get('name'));
					this.chart_.data.datasets[0].data.push(item.get('value'));
					
					const color = this.generateColor_();
					const backgroundOption = this.optionFormatter.backgroundColor(color);
					this.chart_.data.datasets[0].backgroundColor.push(backgroundOption);
					const borderOption = this.optionFormatter.borderColor(color);
					this.chart_.data.datasets[0].borderColor.push(borderOption);	
				}
			}
		});

		this.chart_.update();
	},

	removeChartContext_: function (eve) {
		const index = this.chart_.displayingIDs.indexOf(eve.cid);
		this.chart_.displayingIDs.splice(index, 1);
		this.chart_.data.labels.splice(index, 1);
		this.chart_.data.datasets[0].data.splice(index, 1);
		this.chart_.data.datasets[0].backgroundColor.splice(index, 1);
		this.chart_.data.datasets[0].borderColor.splice(index, 1);

		this.chart_.update();
	},

	generateColor_: function () {
		const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
  	const b = Math.floor(Math.random() * 255);
    return {r, g, b};
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
})