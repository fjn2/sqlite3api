module.exports = (name) => (require('debug')(`${process.env.DEBUG_PREFIX}:${name}`));
