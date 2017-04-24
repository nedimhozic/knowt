import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/repository/user.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { HelperService } from '../../../services/shared/helper.service';

@Component({
    moduleId: module.id,
    selector: 'newPassword',
    templateUrl: `./newPassword.component.html`,
})
export class NewPasswordComponent {
    public tokenFromUrl: string;
    public newPasswordForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    constructor(
        private _fb: FormBuilder,
        private helper: HelperService,
        private router: Router,
        private usersService: UserService,
        private activatedRouter: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRouter.queryParams.subscribe((params: Params) => {
            this.tokenFromUrl = params['token'];
        });
        this.submitted = false;
        this.newPasswordForm = this._fb.group({
            password: ['', [<any>Validators.required, <any>Validators.minLength(6)]],
            confirmPassword: ['', [<any>Validators.required, <any>Validators.minLength(6)]]
        }, { validator: this.helper.matchingPasswords('password', 'confirmPassword') });

        this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.newPasswordForm.statusChanges;
        const myFormValueChanges$ = this.newPasswordForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    doChange(model: User, isValid: boolean) {
        this.submitted = true;
        if (!isValid) return;
        this.usersService.newPassword(this.tokenFromUrl, model.password.toString(), this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    successCallback(data: any) {
        this.newPasswordForm.reset();
        this.submitted = false;
        this.router.navigate(['/login']);
    }

    errorCallback(err: any) {
    }

    checkValid(control: any) {
        return (control.errors && this.submitted)
    }
}