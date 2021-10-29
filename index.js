const path = require('path');
const { saveHTML, readTemplate } = require("./src/utils/file");
const {
	replaceTemplates,
	replaceVariables,
	replaceResources,
} = require("./src/utils/processing");

class HtmlRenderer {
	html = "";

	/**
	 * @param {Configuration} configuration
	 */
	constructor(configuration) {
		this.config = configuration;
	}

	render(path, variables = {}) {
		let content = readTemplate(`${this.config.templatesDirectory}/${path}`);
		content = replaceTemplates(new HtmlRenderer(this.config), content, variables);
		content = replaceVariables(content, variables);
		content = replaceResources(this.config.resourcesUrl, content, variables);
		this.html = content;
		return this;
	}

	save(name) {
		saveHTML(`${this.config.outputDirectory}/${name}`, this.html);
	}

	toString() {
		return this.html;
	}

	static realPath(relativePath) {
		return path.resolve(relativePath);
	}
}

module.exports = HtmlRenderer;
