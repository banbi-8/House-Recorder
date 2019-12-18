require.config({
	baseUrl: "src/js",
	paths: {
		jquery: '../lib/jquery-min',
		underscore: '../lib/underscore-min',
		backbone: '../lib/backbone-min',
		templates: '../templates/',
		text: '../lib/text'
	},
	shim: {
		'backbone': {
				//These script dependencies should be loaded before loading
				//backbone.js
				deps: ['underscore', 'jquery'],
				//Once loaded, use the global 'Backbone' as the
				//module value.
				exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: '$'
		}
	}
});