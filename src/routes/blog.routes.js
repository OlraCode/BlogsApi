const express = require('express');
const router = express.Router();

const {index, show, create, update, remove} = require('../controllers/blog.controller');
const validate = require('../middlewares/validation.middleware');
const auth = require('../middlewares/auth.middleware');
const isAuthor = require('../middlewares/isAuthor.middleware');
const {createBlogSchema, updateBlogSchema} = require('../validations/blog.validation');

router.get('/', index);
router.get('/:slug', show);
router.post('/', auth('moderator'), validate(createBlogSchema), create);
router.put('/:id', auth('moderator'), isAuthor, validate(updateBlogSchema), update);
router.delete('/:id', auth('moderator'), isAuthor, remove);

module.exports = router;