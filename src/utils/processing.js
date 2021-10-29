const templatesRegex = /@([\w\-\_]+)\:([\w\-\_\*]+)/g;
const resourcesRegex = /!([\w\-\_\/]+)([^\w])/g;

const replaceVariables = (content, variables) => {
	Object.entries(variables).forEach(([name, value]) => {
		const regex = new RegExp(`#${name}([^\\w])`, "g");
		content = content.replace(regex, `${value}$1`);
	});

	return content;
};

const replaceResources = (path, content, variables) => {
	content = content.replace(/!!/, path);

	const matches = [...content.matchAll(resourcesRegex)];
	matches.forEach(([full, name, rest]) => {
		content = content.replace(new RegExp(`${full}`, 'g'), `${path}/${variables[name]}${rest}`);
	});

	return content;
};

const replaceTemplates = (html, content, variables) => {
	const matches = resolveTemplates(content);

	matches.forEach((match) => {
		const value = match.variable === '*' ? variables : variables[match.variable];

		content = content.replace(
			match.replacement,
			(Array.isArray(value)
				? value.map((item) => html.render(match.template, item).toString()).join("\n")
				: html.render(match.template, value).toString()) + '$1'
		);
	});

	return content;
};

/**
 * @param {string} content
 * @returns {HtmlMatch[]}
 */
const resolveTemplates = (content) => {
	return [...content.matchAll(templatesRegex)].map((result) => ({
		replacement: new RegExp(`${result[0].replace('*', '\\*')}([^\\w])`, "g"),
		template: result[1],
		variable: result[2],
	}));
};

module.exports = {
	replaceVariables,
	replaceTemplates,
	replaceResources
};
