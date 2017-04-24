import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptionsArgs, RequestMethod } from "@angular/http";
import { RequestArgs } from "@angular/http/src/interfaces";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BaseService {
    protected headers: Headers;
    protected SERVICE_URL: string = 'http://localhost:8000/api/'

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        if (JSON.parse(localStorage.getItem('knowtUser'))) {
            this.headers.append('token', JSON.parse(localStorage.getItem('knowtUser')).token);
        }
    }

    get(url: string, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.get(this.SERVICE_URL + url, { headers: headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }


    post(url: string, data: any, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.post(this.SERVICE_URL + url, data, { headers: headers })
            .map((res: Response) => BaseService.json(res))
            .catch(this.handleError);
    }

    put(url: string, data: any, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.put(this.SERVICE_URL + url, data, { headers: headers })
            .map((res: Response) => BaseService.json(res))
            .catch(this.handleError);
    }

    remove(url: string, data?: any, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.delete(this.SERVICE_URL + url, { headers: headers })
            .map((res: Response) => BaseService.json(res))
            .catch(this.handleError);
    }

    private static json(res: Response): any {
        return res.text() === "" ? res : res.json();
    }

    private handleError(error: any) {
        //console.log(error);
        return Observable.throw(error);

        // The following doesn't work.
        // There's no error status at least in case of network errors.
        // WHY?!
        //
        // if ( error === undefined) error = null;
        // let errMsg = (error && error.message)
        //     ? error.message
        //     : (error && error.status)
        //         ? `${error.status} - ${error.statusText}`
        //         : error;
        //
        // return Observable.throw(errMsg);
    }
}
