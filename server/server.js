const express = require('express')
const path = require('path')


const PORT = process.env.PORT || 3000
const app = express()

// serving the build from the server
app.use(express.static(path.join(__dirname, '..', '/build')))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})