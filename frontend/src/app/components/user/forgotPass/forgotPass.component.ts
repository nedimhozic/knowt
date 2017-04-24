import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/repository/user.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { HelperService } from '../../../services/shared/helper.service';

@Component({
    moduleId: module.id,
    selector: 'forgotPass',
    templateUrl: `./forgotPass.component.html`
})
export class ForgotPasswordComponent {
    public forgotPasswordForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    constructor(
        private _fb: FormBuilder,
        private helper: HelperService,
        private router: Router,
        private usersService: UserService
    ) { }

    ngOnInit() {
        this.submitted = false;
        this.forgotPasswordForm = this._fb.group({
            email: ['', [<any>Validators.required, <any>this.helper.validateEmail]]
        });

        this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.forgotPasswordForm.statusChanges;
        const myFormValueChanges$ = this.forgotPasswordForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    doForgot(model: User, isValid: boolean) {
        this.submitted = true;
        if (!isValid) return;
        this.usersService.forgotPassword(model, this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    successCallback(data: any) {
        this.forgotPasswordForm.reset();
        this.submitted = false;
        // this.msg.grayOut(true);
        // this.msg.show("Check out your email and follow instructions.", { cssClass: 'alert-success', timeout: 10000 });
    }

    errorCallback(err: any) {
        // this.msg.show(err.message, { cssClass: 'alert-danger', timeout: 10000 });
    }

    checkValid(control: any) {
        return (control.errors && this.submitted)
    }
}