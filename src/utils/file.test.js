const fs = require('fs');
const { saveHTML } = require("./file");

jest.mock('fs', () => ({
	existsSync: jest.fn(),
	unlinkSync: jest.fn(),
	writeFileSync: jest.fn()
}));

describe('saveHTML', () => {
	it('should save html', () => {
		const date = new Date();
		jest.useFakeTimers("modern").setSystemTime(date.getTime());

		saveHTML('file', 'some content');

		expect(fs.existsSync).toHaveBeenCalled();
		expect(fs.writeFileSync).toHaveBeenCalledWith('file.html', `
		<!-- Generated at: ${new Date()} -->
		some content
	`);
	});
	it('should save html and unlink file is exists', () => {
		fs.existsSync.mockReturnValueOnce(true);

		saveHTML('directory', 'some content');

		expect(fs.existsSync).toHaveBeenCalled();
		expect(fs.unlinkSync).toHaveBeenCalled();
		expect(fs.writeFileSync).toHaveBeenCalled();
	});
});
