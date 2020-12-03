const Sentry = require('@sentry/node');
const constants = require('./constants/jwt');
const schedule = require('node-schedule');
const CacheHandler = require('./CacheJwtServices');

class CacheRefreshHandler {
    constructor(cache, serviceName) {
        this.cache = cache;
        this.serviceName = serviceName;
    }

    cacheRefreshSchedulerJob() {
        schedule.scheduleJob(constants.JWT_CACHE_REFRESH_TIME, async () => {
            try {
                const cacheJwtEnabledList = new CacheHandler(this.cache, this.serviceName);
                await cacheJwtEnabledList.cacheJwtEnabledServices();
            } catch (error) {
                Sentry.captureException(error);
            }
        });
    };
}
module.exports = CacheRefreshHandler;
