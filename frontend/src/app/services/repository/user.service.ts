import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import {
    RequestOptions,
    RequestMethod,
    RequestOptionsArgs,
    Http,
    Headers
} from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from './base.service';

@Injectable()
export class UserService {

    constructor(private http: Http, private baseService: BaseService) { }

    loginUser(username: String, password: String, token: string, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        let creds = "username=" + username + "&password=" + password;
        if (token) creds += "&token=" + token;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.baseService.post('user/login', creds, headers)
            .subscribe(
            data => successCallback(data),
            err => {
                if (err.status >= 400 && err.status < 500) {
                    errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }

    registerUser(model: User, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.baseService.post('user/register', model, headers)
            .subscribe(
            data => successCallback(data),
            err => {
                if (err.status >= 400 && err.status < 500) {
                    errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }

    forgotPassword(model: User, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        let creds = "email=" + model.email;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.baseService.post('user/forgot', creds, headers)
            .subscribe(
            data => successCallback(data),
            err => {
                if (err.status >= 400 && err.status < 500) {
                    errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }

    newPassword(token: string, password: string, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        let creds = "token=" + token + "&password=" + password;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.baseService.put('user/changePassword', creds, headers)
            .subscribe(
            data => successCallback(data),
            err => {
                if (err.status >= 400 && err.status < 500) {
                    errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }
}