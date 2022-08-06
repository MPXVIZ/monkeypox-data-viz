import express from 'express';
import {
    getCommitHash,
    getLatestCaseData,
    updateRedisWithNewData,
    upsertCommitHashToRedis,
} from '../middleware/updateRedisData.js';

const dataRouter = express.Router();

/**
 * @GET '/api/data'
 * @since 0.1v
 * @desc Get the list of ALL monkeypox cases
 *
 * Steps:
 * - Get commit hash from globaldothealth/monkeypox github repo
 * - Check Redis if most recent commit hash is the same
 * - If they are the same, grab the data from Redis
 * - If they aren't the same, replace Redis data with udpated data and send back to client
 */

dataRouter.get(
    '/',
    getCommitHash,
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

export default dataRouter;
