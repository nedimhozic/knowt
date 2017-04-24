import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/repository/user.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { HelperService } from '../../../services/shared/helper.service';

@Component({
    moduleId: module.id,
    selector: 'registration',
    templateUrl: `./registration.component.html`,
})
export class RegistrationComponent {
    public registrationForm: FormGroup;
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
        this.registrationForm = this._fb.group({
            firstName: ['', [<any>Validators.required]],
            lastName: ['', [<any>Validators.required]],
            email: ['', [<any>Validators.required, <any>this.helper.validateEmail]],
            password: ['', [<any>Validators.required, <any>Validators.minLength(6)]],
            confirmPassword: ['', [<any>Validators.required, <any>Validators.minLength(6)]]
        }, { validator: this.helper.matchingPasswords('password', 'confirmPassword') });

        this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.registrationForm.statusChanges;
        const myFormValueChanges$ = this.registrationForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    doRegister(model: User, isValid: boolean) {
        this.submitted = true;
        if (!isValid) return;
        this.usersService.registerUser(model,
            this.successRegisterCallback.bind(this),
            this.errorRegisterCallback.bind(this));
    }

    successRegisterCallback(data: any) {
        localStorage.setItem('knowtUser', JSON.stringify({ token: data.token, id: data.id }));
        this.router.navigate(['/login']);
    }

    errorRegisterCallback(err: any) {

    }

    checkValid(control: any) {
        return (control.errors && this.submitted)
    }
}