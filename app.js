const express = require('express')
const logger = require('morgan')


//http.createServer
const app = express()
app.use(logger("dev"))
app.use(express.json())

