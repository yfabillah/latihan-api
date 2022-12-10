const jwt = require('jsonwebtoken')


exports.generateJWT = (payload) => {
    const secret = process.env.JWT_SECRET_KEY || 'secret_key'

    return jwt.sign(payload, secret, {
        expiresIn: '1d'
    })
}

exports.decodeJWT = (token) => {
    const secret = process.env.JWT_SECRET_KEY || 'secret_key'

    if(!token){
        throw new Error('Please provide a token!')
    }

    const decoded = jwt.verify(token, secret, (err, decoded) => {
        if(err){
            throw err
        }

        return decoded
    })

    return decoded
}