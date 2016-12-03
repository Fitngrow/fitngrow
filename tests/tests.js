exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeOnly: true,
    specs: [
        'backend/T01-getNotFound.js',
        'e2e/T01-loadData.js'
    ]
};