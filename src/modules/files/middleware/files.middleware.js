const authCheckerMiddleware = (req, res, next) => {
    try {
        const { headers: { authorization } } = req;
        if(!authorization) throw new Error('auth token is missing').message;
        if(!authorization.toLowerCase().includes('bearer')) throw new Error('auth token is not a bearer token').message;
        next();
    } catch (e) {
        if(e.includes('missing')) res.status(400).json({ messages: e });
        if(e.includes('bearer')) res.status(401).json({ messages: e });
        throw e;
    }
};

module.exports = {
    authCheckerMiddleware,
};