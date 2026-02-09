const Blog = require('../models/blog.model');

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
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }

        return res.status(200).json(blog);

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

const create = async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
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