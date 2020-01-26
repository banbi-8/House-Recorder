define([
	'jquery',
	'backbone',
	'pages/dselector',
	'pages/dialog',
	'text!templates/badget.template',
	// no var
	'bootstrap',
	'datatables'
], function (
	$,
	Backbone,
	dSelector,
	Dialog,
	template,
) {
return BadgetView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.dSelector_ = new dSelector();
		this.dialog_ = new Dialog();
		this.template_ = template;
	},
	events: {
		'click .badget-content #test': 'addNewBadgetItem'
	},
	// public
	render: function () {
		this.$el.append(this.template_);
		this.dSelector_.render();
		$('#badget-table').DataTable({
			autoFill: true
		});
	},
	
	// for events
	addNewBadgetItem: function () {
		$('#MODAL1').modal('show');
	},

	// private
	getInputValues: function () {
		let values = {};
		values.bIncome = income = Number($('#income-input').val());
		
		return values;
	}
});
});