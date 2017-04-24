import { Component, OnInit, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TriggerService } from '../../../services/shared/trigger.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Contractor } from '../../../interfaces/contractor.interface';
import { HelperService } from '../../../services/shared/helper.service';
import { ContractorService } from '../../../services/repository/contractor.service';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
    moduleId: module.id,
    selector: 'contractor',
    templateUrl: './contractor.component.html'
})
export class ContractorComponent {
    public contractorForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    private contractorImage: any;
    private contractorBase64: string;
    private contractorImgSrc: string = "";

    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 300,
        resizeMaxWidth: 300
    };

    constructor(
        private _fb: FormBuilder,
        private helper: HelperService,
        private contractorService: ContractorService,
        private router: Router
    ) {
    }

    ngAfterViewInit() {
        setTimeout(function () {
            document.querySelector("body").classList.add("contractor-in");
        }, 0);
        document.querySelector(".close").addEventListener('click', this.close.bind(this));
    }

    ngOnInit() {
        this.submitted = false;
        this.contractorForm = this._fb.group({
            name: ['', [Validators.required]]
        });

        this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.contractorForm.statusChanges;
        const myFormValueChanges$ = this.contractorForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    createContractor(model: Contractor, isValid: boolean) {
        this.submitted = true;
        if (!isValid) {
            return;
        };
        model.image = this.contractorBase64;
        this.contractorService.createContractor(model,
            this.successCreateContractor.bind(this),
            this.errorCreateContractor.bind(this));
    }

    successCreateContractor() {
        this.close();
    }

    errorCreateContractor() {

    }

    checkValid(control: any) {
        return (control.errors && this.submitted)
    }

    selectImage() {
        (<HTMLElement>document.querySelector("#upload_contractor_image")).click();
    }

    onChangeImage(imageResult: ImageResult) {
        this.contractorImgSrc = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        this.contractorBase64 = imageResult.resized.dataURL;
        console.log(imageResult.resized);
    }

    close() {
        document.querySelector("body").classList.remove("contractor-in");
        this.router.navigate([{ outlets: { 'task-router': null } }]);
    }
}