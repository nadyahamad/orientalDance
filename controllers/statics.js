// /index => GET
exports.getIndex = (req, res, next) => {
    res.render(
        'statics/index', 
        {title: 'Oriental Dance', 
        path: '/',
        isAuthenticated: req.session.isLoggedIn
    });
};
