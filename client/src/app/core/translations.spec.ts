import { TestBed, inject } from '@angular/core/testing';
import { HttpLoaderFactory } from './translations';

describe('HttpLoaderFactory', () => {
    class MockHttpClient {
        public handler;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                // { provide: TranslateService, useClass: MockTranslateService },
            ],
        });

        // spyOn((TestBed.get(TranslateService) as any), 'setDefaultLang').and.callThrough();
        // spyOn((TestBed.get(TranslateService) as any), 'use').and.callThrough();
    });

    it('should return TranslateHttpLoader', () => {
        const loader = HttpLoaderFactory(MockHttpClient);
        expect(loader.prefix).toEqual('/assets/i18n/');
        expect(loader.suffix).toEqual('.json');
    });
});
