const { generateJWT, decodeJWT } = require("../../utils/jwt")

const refresh = async(req, res, next) => {
    const cookies = req.cookies
    const {accessToken} = req.cookies

    if(!accessToken){
        res.status(401)
        return next(new Error('Access token cannot be found!'))
    }

    let decoded

    try {
        decoded = decodeJWT(accessToken)
    } catch (error) {
        res.status(401)
        return next(error)
    }

    const newToken = generateJWT({id: decoded.id})

    if(cookies?.accessToken){
        res.clearCookie('accessToken')
    }

    res.status(200)
    res.cookie('accessToken', newToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

    return res.json({
        accessToken: newToken
    })
}

module.exports = refresh