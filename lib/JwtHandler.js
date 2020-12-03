const TokenHandler = require('./TokenHandler');
const CacheHandler = require('./CacheJwtServices');
const CacheRefreshHandler = require('./CacheJwtRefreshJob');
class JwtHandler {
    constructor(serverCache = null, serviceName = null) {
        this.serverCache = serverCache;
        this.serviceName = serviceName;
        this.tokenHandler = new TokenHandler();
        this.cacheHandler = new CacheHandler(this.serverCache, this.serviceName);
        this.cacheRefreshHandler = new CacheRefreshHandler(this.serverCache, this.serviceName);
    }
    isBearer(token) {
        return this.tokenHandler.isBearerToken(token);
    }
    async verifyAndDecode(token) {
        await this.tokenHandler.verifyAndDecodeToken(token);
    }
    async cacheJwtServicesList() {
        await this.cacheHandler.cacheJwtEnabledServices(this.serverCache, this.serviceName);
    }
    retrive(key) {
        return this.cacheHandler.retriveCache(key);
    }
    cacheRefreshScheduler() {
        this.cacheRefreshHandler.cacheRefreshSchedulerJob(this.serverCache, this.serviceName);
    }
}

module.exports = JwtHandler;
