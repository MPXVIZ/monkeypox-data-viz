import { NextFunction, Response } from 'express';
import { MPXCase } from '../types/MPXCase';
import { RedisRequest } from '../types/request';

const dotenv = require('dotenv');
const fetch = require('node-fetch');
const simpleGit = require('simple-git');
dotenv.config();
const {
    SHA_HASH,
    MPX_CASES,
    LAST_UPDATED,
} = require('../constants/redis-constants');
const monkeypoxRepoPath = process.env.MONKEYPOX_REPO_PATH;
const latestJsonPath = process.env.LATEST_JSON_PATH;
// const tsCountryCSV = process.env.TS_COUNTRY_CSV;
// const tsConfirmedCSV = process.env.TS_CONFIRMED_CSV;

const updateRedisAndGetMPXData = async (
    req: RedisRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const client = req.redisClient;
        const expiration: number = Number(req.redisExpiration);
        const commitHash = await getRecentCommitHash();

        const isNewHash = await compareHashes(client, commitHash);
        if (isNewHash === undefined) {
            throw new Error('Hash is undefined');
        }
        console.log(isNewHash);

        const lastUpdated = Date.now().toString();
        req.lastUpdated = lastUpdated;

        if (!isNewHash) {
            req.monkeypoxCaseData = await getAllCasesFromRedis(client);
            if (req.monkeypoxCaseData.length != 0) return next();
        }

        await upsertRedisWithNewCommitHash(
            client,
            commitHash,
            expiration,
            lastUpdated,
        );

        req.monkeypoxCaseData = await getAllCasesFromRepository();
        await updateRedisWithNewData(client, req.monkeypoxCaseData, expiration);

        next();
    } catch (error) {
        console.log(error);
    }
};

const compareHashes = async (
    client: any,
    commitHash: string,
): Promise<boolean> => {
    const redisHash = await client.get(SHA_HASH);
    return redisHash !== commitHash;
};

const getRecentCommitHash = async (): Promise<string> => {
    let data: string = await simpleGit().listRemote([monkeypoxRepoPath]);
    const indexOfHEAD = data.indexOf('\tHEAD');
    const commitHash = data.substring(0, indexOfHEAD);

    return commitHash;
};

const upsertRedisWithNewCommitHash = async (
    client: any,
    commitHash: string,
    expiration: number,
    lastUpdated: string,
): Promise<void> => {
    try {
        await client.set(SHA_HASH, commitHash, {
            EX: expiration,
        });
        await client.set(LAST_UPDATED, lastUpdated, {
            EX: expiration,
        });
    } catch (error) {
        console.error(error);
    }
};

const getAllCasesFromRepository = async () => {
    try {
        const apiResponse = await fetch(latestJsonPath);
        return await apiResponse.json();
    } catch (error) {
        console.error(error);
    }
};

const getAllCasesFromRedis = async (client: any) => {
    const redisResponse = await client.hVals(MPX_CASES);
    const parsedResponse = redisResponse.map((mpCase: any) => {
        return JSON.parse(mpCase);
    });
    return parsedResponse;
};

const updateRedisWithNewData = async (
    client: any,
    caseData: any,
    expiration: number,
) => {
    try {
        for (const mpCase of caseData) {
            const { ID } = mpCase;
            const redisCase = await client.hGet(MPX_CASES, mpCase.ID);

            const stringifiedCase = {
                ID,
                data: JSON.stringify(mpCase),
            };
            if (!redisCase || redisCase !== stringifiedCase.data) {
                await client.hSet(MPX_CASES, mpCase.ID, stringifiedCase.data, {
                    EX: expiration,
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    updateRedisAndGetMPXData,
};
