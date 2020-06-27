define([
	'jquery',
	'underscore'
],
function (
	$,
	_
) {
return Session = {
	store: function (user) {
		return $.post({
			url: 'src/php/session.php',
			dataType: 'json',
			data: {
				method: 'set',
				id: user.id,
				name: user.name
			},
			success: function () {
				console.log('success');
			}
		});
	},
	restore: function () {
		return $.post({
			url: 'src/php/session.php',
			dataType: 'json',
			data: {
				method: 'reset',
			},
			success: function () {
				console.log('success');
			}
		});
	},
	get: function () {
		return $.get({
			url: 'src/php/session.php',
			dataType: 'text',
			success: function (username) {
				return username;
			}
		});
	}
}
});
