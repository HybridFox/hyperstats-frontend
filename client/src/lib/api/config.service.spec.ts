import { ApiConfigService } from './config.service';
import { environment } from '@environments/environment';

describe('ApiConfigService', () => {
    it('Should generate a baseUrl', () => {
        const service = new ApiConfigService();
        const url = service.baseUrl('/jest-tests');
        expect(url).toEqual(`${environment.apiBaseUrl}v2/jest-tests`);
    });
});
