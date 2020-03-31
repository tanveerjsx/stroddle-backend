const passport = require("passport");
// const auth = passport.authenticate('jwt', { session: false })
// module.exports = auth;
module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false } ,function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});

        req.user = user;

        next();

    })(req, res, next);
};