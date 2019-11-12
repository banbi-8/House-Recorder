import * as path from 'path';

const PathUtil = {
	getUtilDirPath: function () {
		return path.dirname(__dirname);
	},
	getCSSDirPath: function () {
		const css = '../../css/';
		return this.getUtilDirPath() + css;
	},
	getHtmlDirPath: function () {
		const html = '../../html/';
		return this.getUtilDirPath() + html;
	},
	getJsDirPath: function () {
		const js = '../../js/';
		return this.getUtilDirPath() + js;
	},
	getTemplatesDirPath: function () {
		const templates = '/../templates/';
		return this.getUtilDirPath() + templates;
	}
}

export {PathUtil};
