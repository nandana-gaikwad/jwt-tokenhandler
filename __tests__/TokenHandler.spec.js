const TokenHandler = require('../lib/TokenHandler.js');
const isTokenHandler = new TokenHandler;

const validToken = 'Bearer abc123';
const invalidToken = 'Fake abc123';


describe('validate_jwt', () => {
    describe('checkIsBearerToken', () => {
        test('should return isBearer token', () => {
            const result = isTokenHandler.isBearerToken(validToken);
            expect(result).toEqual('abc123');
        });

        test('should return false if not Bearer token', () => {
            const result = isTokenHandler.isBearerToken(invalidToken);
            expect(result).toEqual(false);
        });
    });
    describe('checkVerifyAndDecodeTokenTest', () => {
        test('should return true if valid token', async () => {
            jest.spyOn(isTokenHandler, 'verifyAndDecodeToken').mockReturnValue(true);
            const result = await isTokenHandler.verifyAndDecodeToken(validToken);
            expect(result).toEqual(true);
        });
        test('should return false if invalid token', async () => {
            jest.spyOn(isTokenHandler, 'verifyAndDecodeToken').mockReturnValue(false);
            const result = await isTokenHandler.verifyAndDecodeToken(invalidToken);
            expect(result).toEqual(false);
        });
    });
});
