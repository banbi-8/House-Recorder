define([
	'jquery',
	'underscore',
	'backbone',
	'chart',
	'collection/badget-table-item-collection',
], function (
	$,
	_,
	Backbone,
	Chart,
	BadgetTableItemCollection
) {
return BadgetChartView = Backbone.View.extend({
	elSelector_: null,
	chart_: null,
	initialize: function (opts) {
		this.elSelector_ = opts.elSelector;
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
		this.items_ = new BadgetTableItemCollection();
	},

	entry: function () {
		$.when(this.items_.fetch())
		.then(() => {
			_.each(this.items_.models, (item) => {
				this.chart_.data.labels.push(item.get('name'));
				this.chart_.data.datasets[0].data.push(item.get('value'));
				
				const color = this.generateColor_();
				const backgroundOption = this.optionFormatter.backgroundColor(color);
				this.chart_.data.datasets[0].backgroundColor.push(backgroundOption);
				const borderOption = this.optionFormatter.borderColor(color);
				this.chart_.data.datasets[0].borderColor.push(borderOption);
			});
		})
		.then(() => this.render());
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_);
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