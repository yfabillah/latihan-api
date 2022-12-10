const router = require('express').Router()


const { login, register, refresh } = require('../controllers/auths')
const { validateRegister, validateLogin } = require('../middlewares/validation')

router.route('/login').post(validateLogin ,login)
router.route('/register').post(validateRegister, register)
router.route('/refresh').get(refresh)


module.exports = router