const express = require('express');
const {
    getRecentCommitHash,
    getLatestCaseData,
    updateRedisWithNewData,
    upsertCommitHashToRedis,
} = require('../middleware/updateRedisData.js');

const dataRouter = express.Router();

//GET '/api/data'
dataRouter.get(
    '/',
    getRecentCommitHash,
    upsertCommitHashToRedis,
    getLatestCaseData,
    updateRedisWithNewData,
    async (req, res) => {
        try {
            //todo check mpxcasedata with mpxcase type in TS
            const monkeypoxCaseData = req.monkeypoxCaseData;
            console.log('at the end');
            res.status(200).send(monkeypoxCaseData);
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        }
    },
);

module.exports = dataRouter;
