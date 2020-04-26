define([
	'underscore'
], function (
	_
) {
class DateManager {
	constructor () {
		this.year_ = -1;
		this.month_ = -1;
	}

	get dataset () {
		return {
			year: this.year_,
			month: this.month_,
		};
	}

	get year () {
		return this.year_;
	}

	get month () {
		return this.month_;
	}

	set year (y) {
		this.year_ = y;
	}

	set month (m) {
		this.month_ = m;
	}

	set dataset (data) {
		this.year_ = _.has(data, 'year') ? data.year : this.year_;
		this.month_ = _.has(data, 'month') ? data.month : this.month_;
	}

	getYMStr () {
		const yearStr = String(this.year_);
		const monthStr = String(this.month_);

		return `${yearStr}-${monthStr}`;
	}
};

return new DateManager();
});