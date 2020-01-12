define([
	'jquery',
	'underscore'
],
function (
	$,
	_
) {
return Util = {
	getUserTable: function () {
		return $.get({
			url: 'src/php/db.php',
			data: {table: 'user'},
			dataType: 'json',
			success: function (res) {
				return res;
			}
		});
	}
}
});
