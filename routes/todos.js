const express = require('express');
const router = express.Router();
const { all, add, edit, remove } = require('../controllers/todos');
const { auth } = require('../middlewares/auth');

router.get('/', auth, all);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.delete('/remove/:id', auth, remove);

module.exports = router;