define([
	'jquery',
	'backbone',
	'util/db',
	'text!templates/login.template'
], function (
	$,
	Backbone,
	DB,
	template
) {
return LoginView = Backbone.View.extend({
	el: '.contents-area',
	template_: null,
	initialize: function() {
		this.template_ = template;
	},
	events: {
		'click #login': 'login_'
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

	// private
	getInputValue_: function () {
		const input = {
			name: $('#user-name').val(),
			password: $('#password').val()
		};
		return input;
	},
	existsUser_: function (input) {
		return $.when(
			DB.getUserTable()
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