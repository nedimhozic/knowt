import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TriggerService {
    public getTasks = new Subject();

    constructor() { }
    
    public notifyTasks(data: any) {
        this.getTasks.next(data);
    }
}