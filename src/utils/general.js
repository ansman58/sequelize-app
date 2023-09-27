const dotenv = require("dotenv");

dotenv.config();

const getEnv = (env) => {
  return process.env[env] || "";
};

module.exports = { getEnv };
