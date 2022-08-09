import { Response } from 'express';
import { RedisRequest } from '../types/request';

const { updateRedisAndGetMPXData } = require('../middleware/updateRedisData');

const dataRouter = require('express').Router();

// GET '/api/data'
// Gets a list of all cases, whether or not they are confirmed
dataRouter.get(
    '/',
    updateRedisAndGetMPXData,
    async (req: RedisRequest, res: Response) => {
        try {
            const data = {
                monkeypoxCaseData: req.monkeypoxCaseData,
                lastUpdated: req.lastUpdated,
            };
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        }
    },
);

module.exports = dataRouter;
