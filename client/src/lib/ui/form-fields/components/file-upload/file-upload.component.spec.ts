import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
    let fixture: ComponentFixture<FileUploadComponent>;
    let component: FileUploadComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule ],
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
});
