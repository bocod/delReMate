const fs = require('fs');

const logMiddleware = (req, res, next) => {
    fs.appendFileSync('log.txt', `The user visited ${req.url}\n`);
    next();
};

module.exports = logMiddleware;