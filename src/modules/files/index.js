//FILES MODULES
const express = require('express');
const router = express.Router();
const filesController = require('./files.controller');
const { authCheckerMiddleware } = require('./files.middleware');

router.get('/data', (req, res, next) => authCheckerMiddleware(req, res, next), async (req, res) => {
    try {
        const { headers: { authorization } } = req; 
        res.status(200).json(await filesController.getFiles(authorization));
    } catch (e) {
        throw e;
    }
});

module.exports = router;