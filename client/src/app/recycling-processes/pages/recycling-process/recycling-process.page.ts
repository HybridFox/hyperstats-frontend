import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { omit } from 'ramda';

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

    public getStepKey(key: string) {
        return parseInt(key, 16) + 1;
    }

    public deleteStep(key: number) {
        this.recyclingProcessForm.controls.steps.controls.splice(key, 1);
        console.log(this.recyclingProcessForm.controls.steps.controls);
    }

    public duplicateStep(key: number) {
        const newStep = this.createStep();
        newStep.patchValue(
            omit(['uuid'], this.recyclingProcessForm.controls.steps.controls[key].value)
        );
        this.recyclingProcessForm.controls.steps.push(newStep);
    }

    public addStep(): void {
        this.recyclingProcessForm.controls.steps.push(this.createStep());
    }

    public precedingSteps() {
        return this.recyclingProcessForm.controls.steps.controls.reduce((acc: any[], x: any, key: number) => {
            // TODO: Find a way to efficiently translate this. Not in the select component.
            acc.push({
                label: `Recycling Step ${key + 1}`,
                value: x.value.uuid
            });
            return acc;
        }, [
            {
                label: 'None',
                value: 0
            }
        ]);
    }

    private createStep(): FormGroup {
        return this.formBuilder.group({
            uuid: [uuid.v4()],
            precedingStep: [0],
            description: ['', Validators.required],
            recyclingSiteOwner: ['', Validators.required],
            methodOfProcessing: ['', Validators.required],
            qualitativeDescription: ['', Validators.required],
            schematicOverview: ['', Validators.required],
        });
    }
}
