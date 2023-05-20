const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3001'
}))

app.use(express.json())

const router = require('./server/routes/user.routes')

app.use('/api',router)

const PORT = 3000
app.listen(PORT, () => console.log(`server listening PORT:${PORT}`))