const express = require('express');
const router = express.Router();
const passport = require('passport');
const notificationController = require('../../controllers/api/notificationApi');

router.get('/:userType/:userId', notificationController.getNotificationsByUser);



module.exports = router;
