import { Request } from 'express';
import { MPXCase } from './MPXCase';

// const { Request } = require('express');

export type RedisRequest = Request & {
    redisClient: any;
    redisExpiration: string | number;
    monkeypoxCaseData: Array<MPXCase>;
    lastUpdated: string;
};
