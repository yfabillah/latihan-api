require('dotenv').config()

const errorHandler = async(err, req, res, next) => {
    const statusCode = res.statusCode || 500

    const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined

    res.status(statusCode)
    res.json({
        message: err.message,
        stack
    })
}


module.exports = errorHandler