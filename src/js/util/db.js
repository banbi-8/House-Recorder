define([
	'jquery',
	'underscore'
],
function (
	$,
	_
) {
return DB = {
	getTable: function (tableName) {
		return $.get({
			url: 'src/php/get.php',
			data: {tableName: tableName},
			dataType: 'json',
			success: function (res) {
				return res;
			}
		});
	},
	putTable: function (tableName, row) {
		return $.post({
			url: 'src/php/post.php',
			dataType: 'json',
			data: {'tableName': tableName, 'row': row},
			success: function () {
				console.log('put function is succeed');
			}
		})
	}
}
});
