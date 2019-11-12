import fs from "fs";
import $ from 'jquery';
import _ from 'underscore';

import {PathUtil} from './path-util';

const Util = {
	/** 
	 * Get template from file name.
	 */
	getPageContent: function (fileName) {
		const templatesDir = PathUtil.getTemplatesDirPath();
		const path = templatesDir + fileName;
		const res = fs.readFileSync(path, {encoding: "utf-8"});

		return _.template(res);	
	},
};

export {Util};
