exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeOnly: true,
    specs: [
        'backend/*.js',
        'e2e/*.js'
    ]
};