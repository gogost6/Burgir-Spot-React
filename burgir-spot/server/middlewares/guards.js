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
            if (req.data.burgir && req.user && (req.data.burgir.owner.email == req.user.email)) {
                next();
            } else {
                res.status(400);
            }
        };
    }
};