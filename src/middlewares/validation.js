const { check, validationResult } = require("express-validator");

const User = require('../db/models').user

exports.validateRegister = [
    check('username')
    .notEmpty()
    .withMessage('username cannot be empty')
    .matches(/^[a-zA-Z0-9]*$/g)
    .withMessage('username cannot contain spaces or special characters')
    ,

    check('name')
    .notEmpty()
    .withMessage('please enter your name'),

    check('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({min: 6})
    .withMessage('password must be at least 6 characters'),

    check('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('invalid email'),

    check('username').custom(async(value) => {
        const user = await User.findOne({
            where: {username: value}
        })

        if(user){
            return Promise.reject('username already taken!')
        }
    }),

    check('email').custom(async(value) => {
        const user = await User.findOne({
            where: {email: value}
        })

        if(user){
            return Promise.reject('email already taken!')
        }
    }),


    (req, res, next) => {
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422)
            res.json(errors.mapped())

            return
        }

        next()
    }
]


exports.validateLogin = [
    check('identifier')
    .notEmpty()
    .withMessage('Please enter email or username'),

    check('identifier')
    .notEmpty()
    .withMessage('Please enter your password'),

    (req, res, next) => {
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422)
            res.json(errors.mapped())

            return
        }

        next()
    }
]
