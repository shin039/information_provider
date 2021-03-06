/**
 * Logger
 */
const logger = {};

// Debug log
logger.debug = (msg) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DEBUG]: ${msg}`);
  }
}

module.exports = logger;
