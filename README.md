# node-html-renderer

[![](https://tokei.rs/b1/github/jakubrwisniewski/another-ws-server)](jakubrwisniewski/node-html-render)
![GitHub package.json version](https://img.shields.io/github/package-json/v/jakubrwisniewski/node-html-render)

Simple static HTML render, using templates and variables

## Instalation
```
npm install @jkob/node-html-renderer --save
```

## Usage in code

```js
const HtmlRenderer = require('node-html-renderer');

const htmlRenderer = new HtmlRenderer({
	outputDirectory: HtmlRenderer.realPath('./output'),
	templatesDirectory: HtmlRenderer.realPath('./templates'),
	resourcesUrl: '../public' // any path to be resolved in browser, relative to index.html
});

htmlRenderer
	.render('page', {
		title: 'Page Title',
		posts: [
			{ title: 'Post 1' },
			{ title: 'Post 2' },
		]
	})
	.save('index);
```

Above example will create `index.html` file with parsed content in `./output` directory. Template `page` will be resolved to `./templates/page.html` file

## Template syntax

Templates are simple HTML files with extra syntax recognized by HTML Renderer.

### Variables

Variables are defined with second argument to render method. Variable name is a key from object argument.

```html
<div>
	#title
</div>
```

When using with `render('', { title: 'Example Title' })`, will render:
```html
<div>
	Example Title
</div>
```

### Templates

HTML Renderer has support for templates, and templates list.

Syntax is:
```
@[template_name]:[variable_name]
```

for example
```
@postList:posts
```
will use `postList` template with `posts` variable.
If variable will be an array, template will be resolved as list.

### Resource resolver

Rules
- all occurences of `!!` will be changed to defined `resourcesUrl`
- same rules as variables but prefix is `!`, for example `!imageVariable`. This will also use `resourcesUrl` to prefix resource with correct page. Use relative resource path here.

### Full featured example

```html
<!-- templates/image.html -->
<img src="!image" />
```

```html
<!-- templates/post-content.html -->
<p>#text</p>
```

```html
<!-- templates/post.html -->
<article>
	<h2>#title</h2>
	@image:* <!-- * is used to pass entire variables scope to template -->
	@post-content:content
</article>
```

```html
<!-- templates/page.html -->
<html>
	<head>
		<title>#title</title>
		<link rel="stylesheet" href="!!/style.css" />
	</head>
	<body>
		<h1>#title</h1>
		<main>
			@post:posts
		</main>
	</body>
</html>
```

```js
const htmlRenderer = new HtmlRenderer({
	outputDirectory: HtmlRenderer.realPath('./output'),
	templatesDirectory: HtmlRenderer.realPath('./templates'),
	resourcesUrl: '../public' // any path to be resolved in browser
});

htmlRenderer.render('page', {
	title: 'Blog',
	posts: [
		{ title: 'First post', image: 'happy.jpg', content: { text: 'happy' } },
		{ title: 'Second post', image: 'great.jpg', content: { text: 'great' } },
	]
}).save('index');
```

```html
<!-- output/index.html -->
<html>
	<head>
		<title>Blog</title>
		<link rel="stylesheet" href="../public/style.css" />
	</head>
	<body>
		<h1>Blog</h1>
		<main>
			<article>
				<h2>First post</h2>
				<img src="../public/happy.jpg" />
				<p>happy</p>
			</article>
			<article>
				<h2>Second post</h2>
				<img src="../public/great.jpg" />
				<p>great</p>
			</article>
		</main>
	</body>
</html>
```
