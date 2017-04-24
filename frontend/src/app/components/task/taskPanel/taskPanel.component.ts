import { Component, Output, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/repository/task.service';
import { TriggerService } from '../../../services/shared/trigger.service';

@Component({
    moduleId: module.id,
    selector: 'taskPanel',
    templateUrl: `./taskPanel.component.html`
})
export class TaskPanelComponent {
    private currentUser: any;
    public allTasks: Array<Task>;
    public morning: Array<any>;
    public afternoon: Array<any>;
    public evening: Array<any>;

    constructor(
        private router: Router,
        private tasksService: TaskService,
        private triggerService: TriggerService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('knowtUser'));
        if (!this.currentUser) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.triggerService.getTasks.subscribe(data => {
            this.filterTasks(data as string);
        });
    }

    ngAfterViewInit() {
        document.querySelector("#actions > button").addEventListener('click', function () {
            document.querySelector("#actions > button").classList.toggle("in");
            let actions = document.getElementsByClassName("actions");
            for (let i = 0; i < actions.length; i++) {
                actions[i].classList.toggle("in")
            }
        });
    }

    filterTasks(date: any) {
        this.morning = new Array<any>();
        this.afternoon = new Array<any>();
        this.evening = new Array<any>();
        this.tasksService.getTasks(this.currentUser.id, date, this.processTasks.bind(this), this.backToLogin.bind(this));
    }

    backToLogin(err: any) {
        this.router.navigate(['/login']);
        //this.msg.show(err.message, { cssClass: 'alert-danger', timeout: 10000 });
    }

    processTasks(tasks: any[]) {
        for (let i in tasks) {
            let hours = new Date(tasks[i].date).getHours();
            if (hours <= 12) {
                this.morning.push(tasks[i]);
            } else if (hours > 12 && hours <= 16) {
                this.afternoon.push(tasks[i]);
            } else {
                this.evening.push(tasks[i]);
            }
        }
    }
}
