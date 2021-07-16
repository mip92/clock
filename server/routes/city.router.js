const Router =require('express').Router;
const router = new Router();
//const {body}=require('express-validator')
const cityController = require('../controller/city.controller')

/*routes.post('/newOrder',
    body('email').isEmail(),
    body('password').isLength({min:6, max:15}),
    //userController.registration
);*/
router.post('/createCity', cityController.createCity);
router.get('/getCities', cityController.getCities);
router.get('/getOneCity/:id', cityController.getOneCity);

module.exports=router