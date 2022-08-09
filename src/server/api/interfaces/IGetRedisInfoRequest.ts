export interface IGetRedisInfoRequest extends Express.Request {
    redisClient: any;
    redisExpiration: string | number;
}
