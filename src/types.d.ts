interface Match {
	replacement: RegExp;
	template: string;
	variable: string;
}

interface Configuration {
	templatesDirectory: string;
	outputDirectory: string;
	resourcesUrl: string;
}
