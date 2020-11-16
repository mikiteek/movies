const {PORT, CORS_URL} = process.env;

module.exports = {
  origin: `${CORS_URL}${PORT}`
}