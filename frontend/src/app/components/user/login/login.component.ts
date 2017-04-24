import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/repository/user.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { HelperService } from '../../../services/shared/helper.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: `./login.component.html`,
})
export class LoginComponent {
    public loginForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    private tokenFromUrl: string;
    constructor(
        private _fb: FormBuilder,
        private helper: HelperService,
        private usersService: UserService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRouter.queryParams.subscribe((params: Params) => {
            this.tokenFromUrl = params['token'];
        });
        this.submitted = false;
        this.loginForm = this._fb.group({
            email: ['', [Validators.required, this.helper.validateEmail]],
            password: ['', [<any>Validators.required, <any>Validators.minLength(6)]]
        });

        this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.loginForm.statusChanges;
        const myFormValueChanges$ = this.loginForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    doLogin(model: User, isValid: boolean) {
        this.submitted = true;
        if (!isValid) {
            return;
        };
        this.usersService.loginUser(model.email, model.password, this.tokenFromUrl,
            this.successLoginCallback.bind(this),
            this.errorLoginCallback.bind(this));
    }

    successLoginCallback(data: any) {
        localStorage.setItem('knowtUser', JSON.stringify({ token: data.token, id: data.id }));
        this.router.navigate(['']);
    }

    errorLoginCallback(err: any) {

    }

    checkValid(control: any) {
        return (control.errors && this.submitted)
    }
}
