define([
	'jquery',
	'underscore',
	'backbone',
	'common/util',
	'text!page/login/template/change-password.template'
], function (
	$,
	_,
	Backbone,
	Util,
	template
) {
return ResetPassword = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = _.template(template);
	},
	events: {
		'click #reset': 'resetPassword',
		'click #cancel': 'cancel'
	},

	// public
	render: function () {
		this.$el.html(this.template_);
	},

	resetPassword: function () {
		const value = this.getInputValue();
		
		$.when(this.findUser(value.name))
		.then((user) => {
			if (user) {
				user.password = value.password;
				return DB.putTable('user', user)
					.done(() => {
						alert('パスワードの再設定が成功しました。');
						Backbone.history.navigate('login', true);				
					})
					.fail(() => {
						alert('パスワードの再設定に失敗しました。');
					})
			} else {
				alert('入力したユーザー名は存在しません。');
			}
		})
	},
	
	// for events
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