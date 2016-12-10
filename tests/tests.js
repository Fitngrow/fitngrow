exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeOnly: true,
    specs: [
        'backend/T01-nonExistingRecord.js',
        'backend/T02-wrongNewUser.js',
        'backend/T03-numberOfAchievements.js',
        'e2e/T01-getLogin.js',
        'e2e/T02-listOfAchievements.js'
    ]
};