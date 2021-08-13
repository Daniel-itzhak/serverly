const express = require('express');
const router = express.Router();
const serverController = require('../controllers/servers');


router.get('/servers', serverController.findAll);
router.post('/servers', serverController.addServer);
router.put('/servers/:id', serverController.serverOn);
router.delete('/servers/:id', serverController.deleteServer);

module.exports = router;