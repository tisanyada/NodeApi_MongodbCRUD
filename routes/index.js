const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

router.get('/', indexController.getIndex);
router.post('/addStudent', indexController.postAddStudent);

router.get('/students', indexController.getStudents);
router.get('/students/:id', indexController.getStudentById);
router.get('/students/delete/:id', indexController.deleteStudent);

module.exports = router;