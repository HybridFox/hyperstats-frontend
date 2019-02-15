import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsRepository } from '@api/assets';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FileUploadComponent', () => {
    let fixture: ComponentFixture<FileUploadComponent>;
    let component: FileUploadComponent;

    class MockRepository {
        return;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                ReactiveFormsModule,
            ],
            declarations: [ FileUploadComponent ],
            providers: [
                { provide: AssetsRepository, useClass: MockRepository }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
