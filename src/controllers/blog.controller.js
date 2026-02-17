const Blog = require('../models/blog.model');
const {generateUniqueSlug} = require('../services/blog.service');

const index = async (req, res) => {
    try {
        const blogs = await Blog.find({});

        if (blogs.length === 0) {
            return res.status(200).json({message: "There's no blog"});
        }

        return res.status(200).json(blogs);

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

const show = async (req, res) => {
    try {
        const slug = req.params;
        const blog = await Blog.findOne(slug).populate('author');

        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
        const {password, __v, roles, ...author} = blog.author.toObject();
        const blogDTO = {
            id: blog._id,
            title: blog.title,
            content: blog.content,
            createdAt: new Date(blog.createdAt).toLocaleDateString('pt-BR'),
            author
        }
        return res.status(200).json(blogDTO);

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

const create = async (req, res) => {
    try {
        const slug = await generateUniqueSlug(req.body.title);
        const author = req.user;
        const {title, content} = req.body;

        const newBlog = await Blog.create({title, slug, content, author});
        
        return res.status(201).json(newBlog);

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

const update = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
        
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }

        const updatedBlog = await Blog.findById(blog.id);

        return res.status(200).json(updatedBlog);

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

const remove = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
    
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
    
        return res.status(200).json({message: "Blog deleted"});

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

module.exports = {index, show, create, update, remove};