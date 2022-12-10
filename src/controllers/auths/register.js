const bcrypt = require('bcrypt')
const User = require('../../db/models').user



const register = async(req, res, next) => {
    const {username, email, password, name} = req.body


    const hashedPass = await bcrypt.hash(password, 10)

    await User.create({
        username,
        email, 
        password: hashedPass, 
        name
    })
    .catch(err => {
        res.status(500)
        next(err)
    })


    res.status(201)
    res.json({
        message: 'Register success'
    })

    return 
}

module.exports = register