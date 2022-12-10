const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const { generateJWT } = require('../../utils/jwt')
const User = require('../../db/models').user


const login = async(req, res, next) => {
    const cookies = req.cookies

    const {identifier, password} = req.body


    const user = await User.findOne({
        where: {[Op.or]: [
            {username: identifier},
            {email: identifier}
        ]}
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })

    if(!user){
        res.status(400)
        return next(new Error('Username or email incorrect'))
    }

    const match = bcrypt.compareSync(password, user.password)

    if(!match){
        res.status(400)
        return next(new Error('Password incorrect'))
    }

    if(cookies?.accessToken){
        res.clearCookie('accessToken')
    }

    const accessToken = generateJWT({id: user.id})

    res.status(200)
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({
        message: 'Login Sucess',
        accessToken
    })
    return
}

module.exports = login