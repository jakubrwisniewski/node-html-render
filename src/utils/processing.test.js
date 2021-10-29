const { replaceVariables, replaceResources } = require("./processing");

describe('replaceVariables', () => {

	it('should replace variables', () => {
		const content = `
			<div>#var</div>
			<span>#Something</span>
			<p>#camel_not</p>
			<section>#vars</section>
		`;

		const result = replaceVariables(content, {
			var: 'dog',
			Something: 'cat',
			'camel_not': 'frog',
			vars: 'buffallo'
		});

		expect(result).toEqual(`
			<div>dog</div>
			<span>cat</span>
			<p>frog</p>
			<section>buffallo</section>
		`);
	});

});

describe('replaceResources', () => {

	it('should replace resources', () => {
		const content = `
			<div>!!/styles.css</div>
			<div>!link</div>
			<div>!url</div>
			<div>!url</div>
			<div>!links</div>
			<div>!KOT</div>
		`;

		const result = replaceResources('public', content, {
			link: 'image.jpg',
			url: 'nested/image.png',
			links: 'links.tiff',
			KOT: 'cat.gif'
		});

		expect(result).toEqual(`
			<div>public/styles.css</div>
			<div>public/image.jpg</div>
			<div>public/nested/image.png</div>
			<div>public/nested/image.png</div>
			<div>public/links.tiff</div>
			<div>public/cat.gif</div>
		`);
	});

});
