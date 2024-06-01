const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historiaController');

router.post('/historias', historiaController.createHistoria);
router.get('/historias', historiaController.getAllHistorias);
router.get('/historias/:id', historiaController.getHistoriaById);
router.put('/historias/:id', historiaController.updateHistoria);
router.delete('/historias/:id', historiaController.deleteHistoria);
router.post('/historias/:id/generate', historiaController.generateContent);

module.exports = router;
