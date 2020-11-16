const {PORT, CORS_URL} = process.env;

export default {
  origin: `${CORS_URL}${PORT}`
}