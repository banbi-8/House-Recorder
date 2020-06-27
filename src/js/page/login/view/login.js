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
		this.stateOfStorageCheckbox = localStorage.getItem('isStorageCheckboxChecked') === 'true' ? true : false;
	},
	events: {
		'click #login': 'loginButtonOnClick',
		'click #change-password': 'changePasswordButtonOnClick',
		'click #create-account': 'createAccountButtonOnClick',
		'click #localstorage > input': 'localstrageCheckboxOnClick'
	},

	// public
	render: function () {
		$.when(this.users_.fetch())
		.then(() => {
			this.$el.html(this.template_);
			$('#localstorage > input').prop('checked', this.stateOfStorageCheckbox);
			if (this.stateOfStorageCheckbox) {
				$('#user-name').val(localStorage.getItem('userName'));
			}
		});
	},
	
	// for events
	loginButtonOnClick: function () {
		const input = this.getInputValue_();
		const user = this.users_.findWhere({name: input.name, password: input.password});
		
		if (user) {
			Session.store(user.attributes);

			if (this.stateOfStorageCheckbox) {
				localStorage.setItem('isStorageCheckboxChecked', 'true')
				localStorage.setItem('userName', user.get('name'));
			} else {
				localStorage.setItem('isStorageCheckboxChecked', 'false')
				localStorage.setItem('userName', '');
			}

			Backbone.history.navigate('home', true);
		} else {
			alert('ユーザー名またはパスワードが間違っています。');
		}
	},

	changePasswordButtonOnClick: function () {
		Backbone.history.navigate('password', true);
	},

	createAccountButtonOnClick: function () {
		Backbone.history.navigate('account', true);
	},

	localstrageCheckboxOnClick: function (eve) {
		this.stateOfStorageCheckbox = $(eve.target).prop('checked');
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