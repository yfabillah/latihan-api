const router = require('express').Router()


router.use('/', require('./Auth.routes'))

router.route('/').get(async(req, res) => {
    return res.json({
        message: 'this is api entry point'
    })
})



module.exports = router