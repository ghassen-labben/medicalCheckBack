const express=require('express');
const router=express.Router();

router.use('/doctors',require('./doctors'))
router.use('/patients',require('./patients'))
router.use('/ordenances',require('./ordenances'))
router.use('/meetings',require('./meetings'))
router.use('/notifications',require('./notification'))

module.exports=router;
 