const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/config')
const mongoose = require('mongoose')

//const userRoute = require('./routes/users')
const loginRoute = require('./routes/login')
const userRoute = require('./routes/user')
const employeeRoute = require('./routes/employee')

mongoose.Promise = global.Promise

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(loginRoute)
app.use(userRoute)
app.use(employeeRoute)

mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection
    .once('open', () => {
        console.log(`Mongoose - successful connection ...`)
        app.listen(process.env.PORT || config.port,
            () => console.log(`Server start on port ${config.port} ...`))
    })
    .on('error', error => console.warn(error))
    .on('disconnected', disconnected => console.warn(disconnected))