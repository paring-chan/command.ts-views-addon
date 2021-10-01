// DO NOT RUN THIS ON DEV ENVIRONMENT
// **CI ONLY**

const packageJson = require('./package.json')
const fs = require('fs')

packageJson.version = packageJson.version + '-dev.' + process.env.COMMIT_ID

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))