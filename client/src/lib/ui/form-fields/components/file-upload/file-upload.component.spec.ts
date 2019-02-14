import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { TranslateModule } from '@ngx-translate/core';

describe('FileUploadComponent', () => {
    let fixture: ComponentFixture<FileUploadComponent>;
    let component: FileUploadComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                ReactiveFormsModule,
            ],
            declarations: [ FileUploadComponent ]
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

    it('should accept a file for upload', () => {
        spyOn(component.upload, 'emit').and.callThrough();

        const file = new File(['foo'], 'foo.txt', {
            type: 'text/plain',
          });

        const event = {
            target: {
                files: [file],
            }
        };

        component.onUpload(event);

        const formData: FormData = new FormData();
        formData.append('file', event.target.files[0]);

        expect(component.upload.emit).toHaveBeenCalledWith(formData);
    });
});
