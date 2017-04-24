import { Injectable } from '@angular/core';
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
export class TaskService {

    constructor(private baseService: BaseService) { }

    getTasks(userId: string, date: string, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        this.baseService.get('task/all?userId=' + userId + '&date=' + date)
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