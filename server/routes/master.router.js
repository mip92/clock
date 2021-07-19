const Router =require('express').Router;
const router = new Router();
//const {body}=require('express-validator')
const masterController = require('../controller/master.controller')

/*routes.post('/newOrder',
    body('email').isEmail(),
    body('password').isLength({min:6, max:15}),
    //userController.registration
);*/
router.post('/createMaster', masterController.createMaster);
router.get('/getAllMasters', masterController.getAllMasters);
router.get('/getOneMaster/:id', masterController.getOneMaster);
router.put('/updateMaster', masterController.updateMaster);
router.delete('/deleteMaster', masterController.deleteMaster);


module.exports=router