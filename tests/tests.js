exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeOnly: true,
    specs: [
        /**
         * Automatic execution of every test, divided into backend and e2e
         * If executing isolated tests was necessary, add them into specs list
         *
         *  E.g. backend/T01-nonExistingRecord.js
         */
        'backend/*.js',
        'e2e/*.js'

    ]
};