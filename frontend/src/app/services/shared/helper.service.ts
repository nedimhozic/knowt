import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class HelperService {

    validateEmail(c: FormControl) {
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return EMAIL_REGEXP.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }

    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
        }
    }

    getErrors(group: FormGroup) {
        let result: Array<string> = new Array<string>();
        let i = 0;
        for (let key in group.controls) {
            let value = group.controls[key];
            if (value.hasError('required')) {
                result.push(key + " is required.");
            } else if (value.hasError('validateEmail')) {
                result.push(key + " is not in correct format.");
            }
            i++;
        }
        return result;
    }
}