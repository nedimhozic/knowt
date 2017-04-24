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
import { Contractor } from '../../interfaces/contractor.interface';

@Injectable()
export class ContractorService {

    constructor(private baseService: BaseService) { }

    createContractor(model: Contractor, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        this.baseService.post('contractor', model, null)
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