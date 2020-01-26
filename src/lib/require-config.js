require.config({
	baseUrl: "src/js",
	paths: {
		'jquery': '../lib/jquery-min',
		'underscore': '../lib/underscore-min',
		'backbone': '../lib/backbone-min',
		'templates': '../templates/',
		'text': '../lib/text',
		'bootstrap': "../lib/bootstrap.bundle.min",
		'datatables.net': '../lib/DataTables/DataTables-1.10.20/js/jquery.dataTables.min',
		'datatables.bs': '../lib/DataTables/DataTables-1.10.20/js/dataTables.bootstrap.min',
		'datatables': '../lib/DataTables/datatables.min'
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
		},
		'bootstrap': {
			deps: ['jquery'],
		},
		'datatables': {
			deps: ['jquery']
		}
	}
});