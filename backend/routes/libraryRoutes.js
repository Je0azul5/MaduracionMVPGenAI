const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { validateLibrary } = require('../validators/libraryValidator');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/', 
  auth, 
  checkRole(['admin']), 
  validateLibrary, 
  libraryController.createLibrary
);

module.exports = router; 