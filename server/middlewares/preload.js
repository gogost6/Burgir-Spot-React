function preloadBurgir() {
    return async (req, res, next) => {
        req.data = req.data || {};

        try {
            const burgir = await req.storage.getById(req.params.id);

            if (burgir) {
                req.data.burgir = burgir;
            }
        } catch (err) {
            console.error('Database error:', err.message);
        }

        next();
    };
}

module.exports = {
    preloadBurgir
};