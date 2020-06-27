define([
	'jquery',
	'underscore',
	'backbone'
],
function (
	$,
	_,
	Backbone
) {
return User = Backbone.Model.extend({
	urlRoot: 'src/php/user.php',
	default: {
		id: null,
		name: '',
		password: ''
	}
});
});
