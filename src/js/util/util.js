define([
	'jquery',
	'underscore'
],
function (
	$,
	_
) {
const Util = {
	getTemplate: function (fileName) {
		$.ajax({
			url: 'src/php/getTemplate.php',
			dataType: 'text',
			data: {'fileName': fileName},
			success: function (contents) {
				return _.template(contents);
			}
		});
	}
}

return Util;
});
