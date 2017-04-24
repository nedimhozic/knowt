import { Component, OnInit, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../interfaces/task.interface';
import { TriggerService } from '../../../services/shared/trigger.service';

@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: './calendar.component.html'
})
export class CalendarComponent {
    public monthName: string;
    public month: number;
    public year: number;
    public numberOfDays: number[];

    constructor(
        private elementRef: ElementRef,
        private triggerService: TriggerService
        ) {
        //set month name
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let d: Date = new Date();
        this.month = d.getMonth();
        this.year = d.getFullYear();
        this.monthName = monthNames[d.getMonth()];

        //set number of days
        let date: Date = new Date();
        let lastDay: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.numberOfDays = Array(lastDay.getDate()).fill(lastDay.getDate()).map((x: number, i: number) => i);
    }

    ngAfterViewInit() {
        this.setTodaysDate();
    }

    triggerGetEvents(day: number) {
        let date = this.constructDate(day);
        this.triggerService.notifyTasks(date);
    }

    clickCalendar(event: any, day: number) {
        this.setActiveDate(event.srcElement);
        this.calendarAlignment();
        this.triggerGetEvents(day);
    }

    setTodaysDate() {
        //set todays Date
        let date = new Date();
        let currentDay = parseInt(date.getDate().toString());
        for (let i = 0; i < document.querySelector("#calendar").children.length; i++) {
            let element = <HTMLElement>document.querySelector("#calendar").children[i];
            if (element.innerText == currentDay.toString()) {
                this.setActiveDate(element);
                break;
            }
        }
        this.calendarAlignment();
        this.triggerGetEvents(currentDay);
    }

    calendarAlignment() {
        //calendar alignment
        let dayCellWidth = 144;
        let count = 0;
        let daysPast = 0;
        let calendarWidth = document.querySelector("#calendar").children.length * dayCellWidth;
        document.getElementById("calendar").style.width = calendarWidth + "px";

        let index = Array.prototype.indexOf.call(document.querySelector("#calendar").children, document.querySelectorAll("#calendar li.active")[0]);
        daysPast = index;

        daysPast = ((daysPast - 2) * dayCellWidth) * (-1);
        document.getElementById("calendar").style.marginLeft = daysPast + "px";
    }

    setActiveDate(_element: HTMLElement) {
        if (document.querySelectorAll("#calendar li.active").length > 0) {
            document.querySelectorAll("#calendar li.active")[0].classList.remove("active");
        }
        if (document.querySelectorAll("#calendar li.d-1").length > 0) {
            document.querySelectorAll("#calendar li.d-1")[0].classList.remove("d-1");
        }
        if (document.querySelectorAll("#calendar li.d1").length > 0) {
            document.querySelectorAll("#calendar li.d1")[0].classList.remove("d1");
        }
        for (let i = 0; i < document.getElementById("calendar").children.length; i++) {
            let element = <HTMLElement>document.getElementById("calendar").children[i];
            if (_element == element) {
                _element.classList.add("active");
                if (i != 0) {
                    document.getElementById("calendar").children[i - 1].classList.add("d-1");
                }
                if (i != document.getElementById("calendar").children.length - 1) {
                    document.getElementById("calendar").children[i + 1].classList.add("d1");
                }
                break;
            }
        }
    }

    constructDate(day: number){
        let month: string = (this.month + 1) < 10 ? "0" + (this.month + 1) : (this.month + 1).toString();
        let date = day < 10 ? "0" + day : day.toString();
        let result: string = this.year + "-" + month + "-" + date;
        return result;
    }
}