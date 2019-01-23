import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recycling-process-page',
  templateUrl: './recycling-process.page.html',
})
export class RecyclingProcessPageComponent implements OnInit {
    public recyclingProcessForm: any;

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public ngOnInit() {
        this.recyclingProcessForm = this.formBuilder.group({
            name: ['', Validators.required],
            steps: this.formBuilder.array([this.createStep()])
        });
    }

    public addStep(): void {
        this.recyclingProcessForm.controls.steps.push(this.createStep());
    }

    private createStep(): FormGroup {
        return this.formBuilder.group({
            precedingStep: ['', Validators.required],
            description: ['', Validators.required],
            recyclingSiteOwner: ['', Validators.required],
            methodOfProcessing: ['', Validators.required],
            qualitativeDescription: ['', Validators.required],
            schematicOverview: ['', Validators.required],
        });
    }
}
