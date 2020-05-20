define([
	'jquery',
	'underscore',
	'backbone',
	'common/session',
	'page/common/view/month-selector',
	'common/mediator',
	'text!page/common/template/header-area.template'
], function (
	$,
	_,
	Backbone,
	Session,
	MSelectorView,
	// var
	mediator,
	template
) {
return MenuView = Backbone.View.extend({
	el: '.header-area',
	template_: null,
	selectingTab: 'home',
	initialize: function() {
		this.mSelectorView_ = new MSelectorView({elSelector: '.mselector-line'});
		this.template_ = _.template(template);
		mediator.addView('headerAreaView', this);
	
		this.listenTo(this.mSelectorView_, 'chanagedMonth', this.sendRerenderContentEvent);
	},
	render: function () {
		$.when(
			Session.getUser()
		)
		.then((username) => {
			this.$el.html(this.template_({username: username}));
			this.mSelectorView_.render();
		});
	},

	events: {
		'click li': 'tabOnClick'
	},

	tabOnClick: function (eve) {
		const next = eve.target.id;

		if (this.selectingTab !== next) {
			this.toggleTab(this.selectingTab, next);
			Backbone.history.navigate(next, true);		
		}
	},

	toggleTab: function (current, next) {
		$(`#${current}`).removeClass('active');
		this.selectingTab = next;
		$(`#${next}`).addClass('active');
	},

	sendRerenderContentEvent: function () {
		let adress = '';

		switch (this.selectingTab) {
			case 'home':
				adress = 'homeView';
				break;
			case 'badget':
				adress = 'badgetView';
				break;
			case 'record':
				adress = 'recordView';
				break;
			case 'transition':
				adress = '';
				break;
			default:
				return;
		};

		mediator.send('render', adress);
	}
});
});