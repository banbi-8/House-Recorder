define([
	'jquery',
	'underscore'
],
function (
	$,
	_
) {
return Util = {
	createHash: function (str) {
		var shaObj = new jsSHA('SHA-256', 'TEXT');
		shaObj.update(str);
		return shaObj.getHash('B64');
	}
}
});
