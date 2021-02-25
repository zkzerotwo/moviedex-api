
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIES = require('./movies-data.json')
const cors = require('cors')
const helmet = require('helmet')

console.log(process.env.API_TOKEN)

const app = express();
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    console.log('validate bearer token middleware')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})