const CacheHandler = require('../lib/CacheJwtServices.js');
const isCachejwt = new CacheHandler;

let result;
const data = {};

describe('CacheJwtServicesTest', () => {
    const testKey = 'JwtEnabledServices';
    const testValue = ['service1', 'service2'];
    beforeEach(async () => {
        jest.spyOn(isCachejwt, 'cacheJwtEnabledServices').mockImplementation((key, value) => {
            data[key] = value;
            return Promise.resolve({ success: true });
        });
        result = await isCachejwt.cacheJwtEnabledServices(testKey, testValue);
    });
    test('should set value', async () => {
        expect(result.success).toEqual(true);
    });
    test('should retrive value', async () => {
        jest.spyOn(isCachejwt, 'retriveCache').mockImplementation(k => Promise.resolve(data[k]));
        result = await isCachejwt.retriveCache(testKey);
        expect(result).toEqual(testValue);
    });
});
