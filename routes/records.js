const express = require('express');
const router = express.Router();
const maternalController = require('../controllers/maternalController');

// Route to display the form for creating a new maternal record
router.get('/', (req, res) => {
  res.render('index', { record: null });
});

// Route to create a new maternal record
router.post('/records', maternalController.createRecord);

// Route to list all maternal records
router.get('/records', maternalController.listRecords);

// Route to view an individual maternal record
router.get('/records/:id', maternalController.viewRecord);

// Route to display the form for editing a maternal record
router.get('/records/:id/edit', maternalController.editRecordForm);

// Route to update a maternal record
router.post('/records/:id/update', maternalController.updateRecord);

// Route to delete a maternal record
router.post('/records/:id/delete', maternalController.deleteRecord);

module.exports = router;
