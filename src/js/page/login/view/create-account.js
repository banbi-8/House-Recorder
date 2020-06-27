define([
	'jquery',
	'underscore',
	'backbone',
	'common/util',
	'page/login/model/user',
	'page/login/collection/users',
	'text!page/login/template/create-account.template'
], function (
	$,
	_,
	Backbone,
	Util,
	User,
	Users,
	template
) {
return CreateAccountView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.users_ = new Users();
		this.template_ = _.template(template);
	},
	events: {
		'click #create-user': 'createUser',
		'click #cancel': 'cancel'
	},
	// public
	render: function () {
		$.when(this.users_.fetch())
		.then(() => this.$el.html(this.template_));
	},
	
	// for events
	createUser: function () {
		const input = this.getInputValue();
		const isNotExist = _.isUndefined(this.users_.findWhere({name: input.name}));
		if (isNotExist) {
			const user = new User(input);
			$.when(user.save())
			.done(() => {
				alert('アカウントの作成が完了しました。');
				Backbone.history.navigate('login', true);	
			})
			.fail(() => {
				alert('アカウントの作成に失敗しました。')
			});
	
		} else {
			alert('すでに同名のユーザーが存在しています。ユーザー名を変更してください。')
		}
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