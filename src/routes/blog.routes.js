const express = require('express');
const router = express.Router();

const {index, show, create, update, remove} = require('../controllers/blog.controller');
const validate = require('../middlewares/validation.middleware');
const {createBlogSchema, updateBlogSchema} = require('../validations/blog.validation');

router.get('/', index);
router.get('/:id', show);
router.post('/', validate(createBlogSchema), create);
router.put('/:id', validate(updateBlogSchema), update);
router.delete('/:id', remove);

module.exports = router;