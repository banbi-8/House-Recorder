define([
	'jquery',
	'underscore',
	'backbone',
	'page/record/view/carender-date-view',
	'common/util',
	'common/date-manager',
	'text!page/record/template/carender.template'	
], function (
	$,
	_,
	Backbone,
	DateView,
	Util,
	// var
	dManager,
	template
) {
return CarenderView = Backbone.View.extend({
	initialize: function (opts) {
		this.elSelector_ = opts.elSelector;
		this.template_ = _.template(template);
	},

	render: function () {
		this.setElement(this.elSelector_);

		this.$el.html(this.template_());
		this.renderDates();
	},

	getNowMonthLastDate: function () {
		return new Date(dManager.year, dManager.month, 0).getDate();
	},

	// 0: Sunday, 1: Monday ...
	getNowMonthFirstDay: function () {
		return new Date(dManager.year, dManager.month - 1, 1).getDay();
	},

	getCarenderBaseArr: function () {
		const arr = [[], [], [], [], [], []];
		const nowMonthFirstDay = this.getNowMonthFirstDay();
		for (let i = 1; i <= 42; i++) {
			const week = Math.floor((i - 1) / 7); // 0: week 1 ...
			const date = i - nowMonthFirstDay;  // farst date is 1.
			arr[week].push(date);
		}
		return arr;
	},

	initDateViews_: function () {
		const views = [[], [], [], [], [], []];

		const baseArr = this.getCarenderBaseArr();
		const nowMonthLastDate = this.getNowMonthLastDate();

		_.each(baseArr, (week, i) => {
			_.each(week, (date) => {
				const view = new DateView({date: date, th: nowMonthLastDate});
				views[i].push(view);
			});
		});

		return views;
	},

	renderDates: function () {
		$('#carender-tbody').empty();

		let dom = $();
		this.dateViews_ = this.initDateViews_();

		$.when(
			Util.spinner.show()
		)	
		.then(() => {
			const dfds = [];

			_.each(this.dateViews_, (week) => {
				const tr = $('<tr></tr>');
				_.each(week, (view) => {
					const dfd = $.Deferred();
					
					$.when.apply($, dfds)
					.then(() => view.render())
					.then((html) => {
						tr.append(html);
						dfd.resolve();
					});

					dfds.push(dfd);
				});
				dom = dom.add(tr);
			});
			
			return $.when.apply($, dfds);	
		})
		.done(() => {
			$('#carender-tbody').html(dom);
			Util.spinner.hide()
		});
	},

	shrink: function () {
		$(this.elSelector_).attr('shrink', true);
	},

	expand: function () {
		$(this.elSelector_).attr('shrink', false);
	}
});
});