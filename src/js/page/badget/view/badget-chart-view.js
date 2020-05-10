define([
	'jquery',
	'underscore',
	'backbone',
	'chart',
	'common/mediator'
], function (
	$,
	_,
	Backbone,
	Chart,
	// var
	mediator
) {
return BadgetChartView = Backbone.View.extend({
	elSelector_: null,
	chart_: null,
	initialize: function (opts) {
		this.elSelector_ = opts.elSelector;
		this.tableViews_ = [];

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
		mediator.addView('badgetChartView', this);
	},

	render: function () {
		this.setElement(this.elSelector_);
		this.$el.html(this.template_);
		this.resetContext();
		this.updateChartContext_();
	},

	receive: function (event, opt_data) {
		switch (event) {
			case 'removeCtx':
				this.removeChartContext_(opt_data.cid);
				break;
			case 'updatedItemValue':
				this.updateChartContext_();
				break;
			case 'setDisplayingTableViews':
				this.tableViews_ = opt_data;
				break;
		}
	},

	updateChartContext_: function () {
		_.each(this.tableViews_, (view) => {
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

	generateColor_: function () {
		const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
  	const b = Math.floor(Math.random() * 255);
    return {r, g, b};
	},

	resetContext: function () {
		this.chart_.displayingIDs = [];
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
})