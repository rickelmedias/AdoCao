const jwt = require('jsonwebtoken');

exports.authorizationRequire = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).send({ msg: "Authorization failed"});
    }
}