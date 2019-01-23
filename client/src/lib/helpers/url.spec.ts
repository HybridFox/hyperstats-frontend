import * as urlHelper from './url';

describe('UrlHelper', () => {
    it('Should strip trailing slashes', () => {
        const stripped = urlHelper.stripTrailingSlash('http://google.be/accounts/');
        expect(stripped).toEqual('http://google.be/accounts');

        const alreadyStripped = urlHelper.stripTrailingSlash('http://google.be/accounts-without-slash');
        expect(alreadyStripped).toEqual('http://google.be/accounts-without-slash');
    });
});