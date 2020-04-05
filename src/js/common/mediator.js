define([
],
function (
) {
class Mediator {
	constructor () {
		this.views = {};
	}
	addView (name, view) {
		this.views[name] = view;
	}
	send (event, to, opt_data) {
		this.views[to].receive(event, opt_data);
	}
};

return new Mediator();
});
