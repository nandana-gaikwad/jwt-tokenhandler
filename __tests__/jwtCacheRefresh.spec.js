const CacheHandler = require('../lib/CacheJwtServices.js');
const jwtCacheRefresh = require('../lib/CacheJwtRefreshJob.js');

const cacheObj = new CacheHandler;
const cacheScheduler = new jwtCacheRefresh;

describe('cacheRefreshJob', () => {
    const expectedValue = ['ows-account', 'ows-service'];
    const cachedJwtList = ['ows-account'];

    jest.spyOn(cacheObj, 'retriveCache').mockImplementation(() => cachedJwtList);

    describe('Updating cached list', () => {
        beforeEach(() => {
            jest.spyOn(cacheScheduler, 'cacheRefreshSchedulerJob').mockImplementation(() =>
                // update cached jwt list
                cachedJwtList.push('ows-service')
            );
        });

        test('returns result from cache', async () => {
            cacheScheduler.cacheRefreshSchedulerJob();
            const result = cacheObj.retriveCache('jwt_enabled_services');
            expect(result).toEqual(expectedValue);
        });
    });
});
