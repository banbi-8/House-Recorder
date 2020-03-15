define([
	'jquery',
	'underscore',
	'backbone',
	'page/common/model/model-base'
], function (
	$,
	_,
	Backbone,
	ModelBase
) {
return BadgetItem = ModelBase.extend({
	urlRoot: 'src/php/income.php',
});
});