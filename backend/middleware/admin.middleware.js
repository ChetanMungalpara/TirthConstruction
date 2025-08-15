const admin = (req, res, next) => {
    // req.user is attached by the 'auth' middleware that runs before this
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next function
    } else {
        res.status(403).json({ msg: 'Access denied. Admin privileges required.' });
    }
};

module.exports = admin;