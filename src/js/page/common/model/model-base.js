define([
	'jquery',
	'underscore',
	'backbone',
], function (
	$,
	_,
	Backbone,
) {
return ModelBase = Backbone.Model.extend({
	destroy: function () {
		return Backbone.Model.prototype.destroy.call(this, {data: this.id});
	}
});
});