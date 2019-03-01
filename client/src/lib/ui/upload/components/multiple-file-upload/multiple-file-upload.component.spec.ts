import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MultipleFileUploadComponent } from './multiple-file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsRepository } from '@api/assets';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UploadInputComponent } from '../upload-input/upload-input.component';
import { UploadPreviewComponent } from '../upload-preview/upload-preview.component';
import { UploadedListComponent } from '../uploaded-list/uploaded-list.component';

describe('FileUploadComponent', () => {
    let fixture: ComponentFixture<MultipleFileUploadComponent>;
    let component: MultipleFileUploadComponent;

    class MockRepository {
        return;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                ReactiveFormsModule,
            ],
            declarations: [
                MultipleFileUploadComponent,
                UploadInputComponent,
                UploadPreviewComponent,
                UploadedListComponent
             ],
            providers: [
                { provide: AssetsRepository, useClass: MockRepository }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultipleFileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
