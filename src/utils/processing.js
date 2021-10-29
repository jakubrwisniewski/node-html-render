const replaceVariables = (content, variables) => {
  Object.entries(variables).forEach(([name, value]) => {
    const regex = new RegExp("#" + name, "g");
    content = content.replace(regex, value);
  });

  return content;
};

const replaceTemplates = (view, content, variables) => {
  const matches = resolveTemplates(content);

  console.log(matches);

  matches.forEach((match) => {
    const value = variables[match.variable];

    content = content.replace(
      match.replacement,
      Array.isArray(value)
        ? value.map((item) => view.render(match.template, item).toString()).join("\n")
        : view.render(match.template, value).toString()
    );
  });

  return content;
};

const regex = /@([a-zA-Z0-9\-\_]+)\:([a-zA-Z0-9\-\_]+)/g;

/**
 * @param {string} content
 */
const resolveTemplates = (content) => {
  return [...content.matchAll(regex)].map((result) => ({
    replacement: new RegExp(`${result[0]}[^\\w]`, "g"),
    template: result[1],
    variable: result[2],
  }));
};

module.exports = {
  replaceVariables,
  replaceTemplates,
};
