const express = require('express');
const router = express.Router();

const blogRoutes = require('./blog.routes');
const authRoutes = require('./auth.routes');

router.use('/blog', blogRoutes);
router.use('/auth', authRoutes);

module.exports = router;