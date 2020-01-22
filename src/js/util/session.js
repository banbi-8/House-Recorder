define([
	'jquery',
	'underscore'
],
function (
	$,
	_
) {
return Session = {
	setUser: function (user) {
		return $.post({
			url: 'src/php/login.php',
			dataType: 'json',
			data: {
				id: user.id,
				name: user.name
			},
			success: function () {
				console.log('success');
			}
		});
	}
}
});
