const express = require('express');
const router = express.Router();

const {index, show, create, update, remove} = require('../controllers/blog.controller');

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;