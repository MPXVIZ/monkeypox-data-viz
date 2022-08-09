const express = require('express');
declare global {
    namespace Express {
        interface Request {
            redisExpiration?: string | number;
            redisClient?: Record<redis.RedisClientType, any>;
            monkeypoxCaseData: Object;
        }
    }
}
