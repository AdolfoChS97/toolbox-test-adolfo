//FILES MODULES
const express = require('express');
const router = express.Router();
const filesController = require('./controller/files.controller');
const { authCheckerMiddleware } = require('./middleware/files.middleware');

router.get('/data',[authCheckerMiddleware], async (req, res) => {
    try {
        const { headers: { authorization }, query: { fileName } } = req;
        res.status(200).json(await filesController.getFiles(authorization, fileName));
    } catch (e) {
        throw e;
    }
});

router.get('/list', [authCheckerMiddleware], async (req, res) => {
    try {
        const { headers: { authorization } } = req;
        res.status(200).json(await filesController.getFileList(authorization));
    } catch (e) {
        throw e;
    }
});

module.exports = router;