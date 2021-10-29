const fs = require("fs");

const readTemplate = (path) => {
  return fs.readFileSync(`${path}.html`).toString();
};

const saveHTML = (path, content) => {
	path += '.html';

	if(fs.existsSync(path)) {
		fs.unlinkSync(path);
	}

	fs.writeFileSync(path, `
		<!-- Generated at: ${new Date()} -->
		${content}
	`);
};

module.exports = {
	readTemplate,
	saveHTML
};