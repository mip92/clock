const Router = require('express')
const router = new Router()

const cityRouter=require('./city.router')
const masterRouter=require('./master.router')

router.use('/city', cityRouter)
router.use('/master',masterRouter)

module.exports=router