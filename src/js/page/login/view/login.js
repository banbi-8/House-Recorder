define([
	'jquery',
	'underscore',
	'backbone',
	'common/session',
	'common/util',
	'page/login/collection/users',
	'text!page/login/template/login.template'
], function (
	$,
	_,
	Backbone,
	Session,
	Util,
	Users,
	template
) {
return LoginView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.users_ = new Users();
		this.template_ = _.template(template);
		this.needsSaveLoginUserInfo = localStorage.getItem('isStorageCheckboxChecked') === 'true' ? true : false;
	},
	events: {
		'click #login': 'loginButtonOnClick',
		'click #change-password': 'resetPasswordButtonOnClick',
		'click #create-account': 'createAccountButtonOnClick',
		'click #localstorage > input': 'localstrageCheckboxOnClick'
	},

	// public
	render: function () {
		$.when(this.users_.fetch())
		.then(() => {
			this.$el.html(this.template_);
			$('#localstorage > input').prop('checked', this.needsSaveLoginUserInfo);
		});
	},
	
	// for events
	loginButtonOnClick: function () {
		const input = this.getInputValue_();
		const user = this.users_.findWhere({name: input.name, password: input.password});
		
		if (user) {
			Session.store(user.attributes);

			if (this.needsSaveLoginUserInfo) {
				localStorage.setItem('isStorageCheckboxChecked', 'true')
				localStorage.setItem('loginUser', user.get('name'));
			} else {
				localStorage.setItem('isStorageCheckboxChecked', 'false')
				localStorage.setItem('loginUser', '');
			}

			Backbone.history.navigate('home', true);
		} else {
			alert('ユーザー名またはパスワードが間違っています。');
		}
	},

	resetPasswordButtonOnClick: function () {
		Backbone.history.navigate('change_password', true);
	},

	createAccountButtonOnClick: function () {
		Backbone.history.navigate('send_mail', true);
	},

	localstrageCheckboxOnClick: function (eve) {
		this.needsSaveLoginUserInfo = $(eve.target).prop('checked');
	},

	// private
	getInputValue_: function () {
		const value = {
			name: $('#user-name').val(),
			password: Util.createHash($('#password').val())
		};
		return value;
	}
});
});