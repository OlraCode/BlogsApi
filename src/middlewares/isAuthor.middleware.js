const Blog = require('../models/blog.model');

const isAuthor = async (req, res, next) => {
    const _id = req.params.id;
    const author = req.user._id;

    const exists = await Blog.exists({_id, author})

    if (!exists) {
        return res.status(401).json({error: "Não é o autor"});
    }
     
    next();
};

module.exports = isAuthor;