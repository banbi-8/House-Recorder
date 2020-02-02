define([
	'jquery',
	'backbone',
	'model/table-item-model'
], function (
	$,
	Backbone,
	TableItem
) {
return BadgetTableItems= Backbone.Collection.extend({
	model: TableItem,
});
});