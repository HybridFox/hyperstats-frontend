import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SingleFileUploadComponent } from './single-file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsRepository } from '@api/assets';
import { UploadInputComponent } from '../upload-input/upload-input.component';
import { UploadPreviewComponent } from '../upload-preview/upload-preview.component';
import { UploadedListComponent } from '../uploaded-list/uploaded-list.component';

describe('FileUploadComponent', () => {
    let fixture: ComponentFixture<SingleFileUploadComponent>;
    let component: SingleFileUploadComponent;

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
                SingleFileUploadComponent,
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
        fixture = TestBed.createComponent(SingleFileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});
