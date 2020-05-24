define([
	'jquery',
	'underscore',
	'backbone',
	'common/db',
	'common/session',
	'common/util',
	'text!page/login/template/login.template'
], function (
	$,
	_,
	Backbone,
	DB,
	Session,
	Util,
	template
) {
return LoginView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = _.template(template);
		this.needsSaveLoginUserInfo = localStorage.getItem('isStorageCheckboxChecked') === 'true' ? true : false;
	},
	events: {
		'click #login': 'loginButtonOnClick',
		'click #create-account': 'createAccountButtonOnClick',
		'click #localstorage > input': 'localstrageCheckboxOnClick'
	},

	// public
	render: function () {
		this.$el.html(this.template_);

		$('#localstorage > input').prop('checked', this.needsSaveLoginUserInfo);
	},
	
	// for events
	loginButtonOnClick: function () {
		this.findUser(this.getInputValue_())
		.then((user) => {
			if (user) {
				Session.setUser(user);

				if (this.needsSaveLoginUserInfo) {
					localStorage.setItem('isStorageCheckboxChecked', 'true')
					localStorage.setItem('loginUser', user.name);
				} else {
					localStorage.setItem('isStorageCheckboxChecked', 'false')
					localStorage.setItem('loginUser', '');
				}

				Backbone.history.navigate('home', true);
			} else {
				alert('not exist input user');
			}
		});
	},

	createAccountButtonOnClick: function () {
		Backbone.history.navigate('create_account', true);
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
	},

	findUser: function (input) {
		return $.when(DB.getTable('user'))
			.then((users) => {
				return _.findWhere((users), {name: input.name, password: input.password});
			})
	}
});
});