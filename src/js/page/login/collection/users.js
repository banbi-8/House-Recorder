define([
	'jquery',
	'underscore',
	'backbone',
	'page/login/model/user'
],
function (
	$,
	_,
	Backbone,
	User
) {
return Users = Backbone.Collection.extend({
	model: User,
	fetch: function () {
		this.reset();
		return $.get({
			url: 'src/php/user.php',
			dataType: 'json',
			success: function (attrs) {
				return attrs;
			}
		})
		.then((attrs) => {
			_.each(attrs, (attr) => {
				this.add(new User(attr));
			});
		});
	}
});
});
