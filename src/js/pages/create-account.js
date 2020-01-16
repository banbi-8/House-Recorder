define([
	'jquery',
	'backbone',
	'util/db',
	'util/util',
	'text!templates/create-account.template'
], function (
	$,
	Backbone,
	DB,
	Util,
	template
) {
return CreateAccountView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = template;
	},
	events: {
		'click #create-user': 'createUser',
		'click #cancel': 'cancel'
	},
	// public
	render: function () {
		this.$el.append(this.template_);
	},
	
	// for events
	createUser: function () {
		const input = this.getInputValue();

		$.when(
			DB.putTable('user', input)
		)
		.done(() => {
			alert('アカウントの作成が完了しました。');
			Backbone.history.navigate('login', true);	
		})
		.fail(() => {
			alert('アカウントの作成に失敗しました。')
		});
	},
	cancel: function () {
		Backbone.history.navigate('login', true);
	},

	// private
	getInputValue: function () {
		let input = {
			name: $('#user-name').val(),
			password: Util.createHash($('#password').val())
		};

		return input;
	},
});
});