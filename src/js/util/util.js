define([
	'jquery',
	'underscore'
],
function (
	$,
	_
) {
return Util = {
	sleep: function (time) {
		const dfd = $.Deferred();
		setTimeout(
			function () {
				return dfd.resolve();
			}, 
			time
		);
		return dfd.promise();
	},
	
	createHash: function (str) {
		var shaObj = new jsSHA('SHA-256', 'TEXT');
		shaObj.update(str);
		return shaObj.getHash('B64');
	}
}
});
