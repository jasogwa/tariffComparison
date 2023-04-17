import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent {
    consumptionForm: any = FormGroup;
    consumptionData: any = [];

    constructor(private fb: FormBuilder, private service: ServiceService) {
        this.consumptionForm = this.fb.group({
            consumption: ''
        });
        this.createForm();
    }

    createForm() {
        this.consumptionForm = this.fb.group({
            consumption: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
        });
    }

    onFormSubmit() {
        if (this.consumptionForm.valid) {
            this.service.requestConsumption(this.consumptionForm.value).subscribe({
                next: (values: any) => {
                    this.consumptionData = values['message'];
                },
                error: (err: any) => {
                    console.log(err);
                }
            });
        }
    }
}
