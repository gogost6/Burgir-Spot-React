module.exports = {
    isAuth() {
        return (req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    },
    isGuest() {
        return (req, res, next) => {
            if (!req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    },
    isOwner() {
        return (req, res, next) => {
            const id = req.data.burgir._id.toHexString()

            if (req.data.burgir && req.user && req.user.createdBurgirs.includes(id)) {
                next();
            } else {
                res.status(400);
            }
        };
    }
};