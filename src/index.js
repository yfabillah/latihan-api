require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const cookieParser = require('cookie-parser')


const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)
app.route('/').get(async(req, res) => {
    return res.json({
        message: 'this is sparta!'
    })
})

app.use(errorHandler)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('App is listening on port', port)
})