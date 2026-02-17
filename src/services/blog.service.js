const slugify = require('slugify');
const Blog = require('../models/blog.model');

const generateUniqueSlug = async (title) => {
    const slug = slugify(title, {
        lowercase: true,
        strict: true,
    });

    let slugExist = await Blog.exists({slug});
    let count = 1;
    let newSlug = slug;

    while (slugExist) {
        newSlug = `${slug}-${++count}`;
        slugExist = await Blog.exists({slug: newSlug});
    }

    return newSlug;
};

module.exports = {generateUniqueSlug};