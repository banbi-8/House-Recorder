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
return ChangePassword = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.users_ = new Users();
		this.template_ = _.template(template);
	},
	events: {
		'click #reset': 'updatePassword',
		'click #cancel': 'cancel'
	},

	// public
	render: function () {
		$.when(this.users_.fetch())
		.then(() => this.$el.html(this.template_));
	},

	updatePassword: function () {
		const input = this.getInputValue();
		const user = this.users_.findWhere({name: input.name});
		
		$.when()
		.then(() => {
			if (user) {
				user.set({ 'password': input.password });
				return user.save()
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