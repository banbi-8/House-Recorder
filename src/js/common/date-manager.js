define([
	'underscore'
], function (
	_
) {
class DateManager {
	constructor () {
		this.year_ = -1;
		this.month_ = -1;
		this.date_ = -1;
	}

	get dataset () {
		return {
			year: this.year_,
			month: this.month_,
			date: this.date_
		};
	}

	get year () {
		return this.year_;
	}

	get month () {
		return this.month_;
	}

	get date () {
		return this.date_;
	}

	set year (y) {
		this.year_ = y;
	}

	set month (m) {
		this.month_ = m;
	}
	
	set date (d) {
		this.date_ = d;
	}

	set dataset (data) {
		this.year_ = _.has(data, 'year') ? data.year : this.year_;
		this.month_ = _.has(data, 'month') ? data.month : this.month_;
		this.date_ = _.has(data, 'date') ? data.date_ : this.date_;
	}

	getYMStr () {
		const yearStr = String(this.year_);
		const monthStr = String(this.month_);

		return `${yearStr}/${monthStr}`;
	}

	getYMDStr () {
		const yearStr = String(this.year_);
		const monthStr = String(this.month_);
		const dateStr = String(this.date_);

		return `${yearStr}/${monthStr}/${dateStr}`;
	}
};

return new DateManager();
});