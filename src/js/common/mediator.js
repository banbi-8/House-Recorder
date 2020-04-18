define([
],
function (
) {
class Mediator {
	constructor () {
		this.views_ = {};
	}
	addView (name, view) {
		this.views_[name] = view;
	}
	send (event, to, opt_data) {
		this.views_[to].receive(event, opt_data);
	}
};

return new Mediator();
});
