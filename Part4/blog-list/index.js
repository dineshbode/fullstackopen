const app = require('./app.js')
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})