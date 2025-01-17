const  JWT_SECRET  = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({"error": "Authorisation failed"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded)
        {
            req.userId = decoded.userId;
            //console.log(req.userId);
            next();
        }
        else
        return res.status(403).json({"error":"Error in authorisation"});
    } catch (err) {
        return res.status(403).json({error: err});
    }
};

module.exports =  authMiddleware;