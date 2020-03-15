define([
	'jquery',
	'underscore',
	'backbone',
	'page/record/view/carender-date-view',
	'text!page/record/template/carender.template'	
], function (
	$,
	_,
	Backbone,
	DateView,
	template
) {
return CarenderView = Backbone.View.extend({
	initialize: function (opts) {
		this.elSelector_ = opts.elSelector;
		this.date_ = opts.date;
		this.template_ = _.template(template);
	},

	render: function () {
		this.setElement(this.elSelector_);

		this.$el.html(this.template_());
		this.setDate_();
	},

	getNowMonthLastDate: function () {
		return new Date(this.date_.year, this.date_.month, 0).getDate();
	},

	// 0: Sunday, 1: Monday ...
	getNowMonthFirstDay: function () {
		return new Date(this.date_.year, this.date_.month - 1, 1).getDay();
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
				const view = new DateView({date: {year: this.date_.year, month: this.date_.month, date: date}, th: nowMonthLastDate});
				this.listenTo(view, 'clickedEditButton', this.showEditArea);
				views[i].push(view);
			});
		});

		return views;
	},

	setDate_: function () {
		$('tbody').empty();

		let dom = $();
		this.dateViews_ = this.initDateViews_();

		$.when()
		.then(() => {
			const dfds = [];

			_.each(this.dateViews_, (week) => {
				const tr = $('<tr></tr>');
				_.each(week, (view) => {
					const dfd = $.Deferred();
					
					$.when()
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
			$('tbody').html(dom);
		});
	},

	showEditArea: function (cid) {
		this.trigger('showEditView', this.findDateViewWithCid_(cid));
	},

	findDateViewWithCid_: function (cid) {
		let res = null;
		_.each(this.dateViews_, (week) => {
			if (!res) {
				_.each(week, (view) => {
					if (view.cid === cid) {
						res = view;
					}
				});
			}
		});

		return res;
	},

	shrink: function () {
		$(this.elSelector_).attr('shrink', true);
	}
});
});