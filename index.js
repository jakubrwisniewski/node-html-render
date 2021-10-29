const { saveHTML, readTemplate } = require("./src/utils/file");
const {
  replaceTemplates,
  replaceVariables,
} = require("./src/utils/processing");

class View {
  html = "";

  constructor(configuration) {
    this.config = configuration;
  }

  render(path, variables = {}) {
    let content = readTemplate(`${this.config.templatesDirectory}/${path}`);
    content = replaceTemplates(new View(this.config), content, variables);
    content = replaceVariables(content, variables);
    this.html = content;
    return this;
  }

  save(name) {
    saveHTML(`${this.config.outputDirectory}/${name}`, this.html);
  }

  toString() {
	  return this.html;
  }
}

module.exports = View;
