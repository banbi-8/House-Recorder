define([
	'jquery',
	'backbone',
	'util/db',
	'util/util',
	'text!templates/login.template'
], function (
	$,
	Backbone,
	DB,
	Util,
	template
) {
return LoginView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = template;
	},
	events: {
		'click #login': 'login_',
		'click #create-account': 'showCreateAccountPage'
	},
	// public
	render: function () {
		this.$el.append(this.template_);
	},
	
	// for events
	login_: function () {
		this.existsUser_(this.getInputValue_())
		.then((exists) => {
			if (exists) {
				Backbone.history.navigate('home', true)
			} else {
				alert('not exist input user');
			}
		});
	},
	showCreateAccountPage: function () {
		Backbone.history.navigate('create_account', true);
	},

	// private
	getInputValue_: function () {
		const input = {
			name: $('#user-name').val(),
			password: Util.createHash($('#password').val())
		};
		return input;
	},
	existsUser_: function (input) {
		return $.when(
			DB.getTable('user')
		)
		.then((users) => {
			let exists = false;
			exists = _.find((users), (user) => {
				if (input.name === user.name &&
					input.password === user.password) {
					return true; 
				}
			});

			return exists;
		})
	}
});
});