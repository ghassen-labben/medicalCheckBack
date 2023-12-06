const express=require('express');
const router=express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../config/swagger.json');
router.use('/doctors',require('./doctors'))
router.use('/patients',require('./patients'))
router.use('/ordenances',require('./ordenances'))
router.use('/meetings',require('./meetings'))
router.use('/notifications',require('./notification'))


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports=router;
 