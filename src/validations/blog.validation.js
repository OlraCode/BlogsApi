const z = require('zod');

const createBlogSchema = z.object({
    title: 
        z.string("Title must be a string")
        .min(5, "Title must have at least 5 characters")
        .max(50, "Title can have up to 50 characters"),

    content: 
        z.string("Content must be a string")
        .min(30, "Content must have at least 30 characters")
        .max(3000, "Slug can have up to 3000 characters"),
});

const updateBlogSchema = z.object({
    title: 
        z.string("Title must be a string")
        .min(5, "Title must have at least 5 characters")
        .max(50, "Title can have up to 50 characters")
        .optional(),

    content: 
        z.string("Content must be a string")
        .min(30, "Content must have at least 30 characters")
        .max(3000, "Slug can have up to 3000 characters")
        .optional(),
});

module.exports = {createBlogSchema, updateBlogSchema};