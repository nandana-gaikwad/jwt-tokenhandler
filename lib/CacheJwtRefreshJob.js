const Sentry = require('@sentry/node');
const constants = require('./constants/jwt');

const schedule = require('node-schedule');
const CacheHandler = require('./CacheJwtServices');

class CacheRefreshHandler {
    constructor(cache) {
        this.cache = cache;
    }
    cacheRefreshSchedulerJob = () => {
        schedule.scheduleJob(constants.JWT_CACHE_REFRESH_TIME, async () => {
            try {
                const cacheJwtEnabledList = new CacheHandler(this.cache);
                await cacheJwtEnabledList.cacheJwtEnabledServices();
                const data = await cacheJwtEnabledList.retriveCache(constants.JWT_SECRETS_KEY);
            } catch (error) {
                Sentry.captureException(error);
            }
        });
    };
}
module.exports = CacheRefreshHandler;
