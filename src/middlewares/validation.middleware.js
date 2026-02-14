const validate = (schema) => async (req, res, next) => {
        const result = await schema.safeParseAsync(req.body);

        if (!result.success) {
            const errors = result.error.issues;

            const formatteedErrors = errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {});

            res.status(400);
            return res.json({errors: formatteedErrors});
        }
        next();
}

module.exports = validate