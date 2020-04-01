define([
	'jquery',
	'backbone',
	'common/db',
	'common/session',
	'common/util',
	'text!page/login/template/login.template'
], function (
	$,
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
		this.findUserIfExist_(this.getInputValue_())
		.then((user) => {
			if (user) {
				Session.setUser(user);
				this.trigger('login');
				Backbone.history.navigate('home', true);
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
	findUserIfExist_: function (input) {
		return $.when(DB.getTable('user'))
			.then((users) => {
				return _.findWhere((users), {name: input.name, password: input.password});
			})
	}
});
});