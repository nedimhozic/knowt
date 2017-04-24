import { Component, OnInit, ElementRef, AfterViewInit, Output, EventEmitter, Renderer, Injector } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TriggerService } from '../../../services/shared/trigger.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Contractor } from '../../../interfaces/contractor.interface';
import { HelperService } from '../../../services/shared/helper.service';
import { ContractorService } from '../../../services/repository/contractor.service';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { dragula, DragulaService } from 'ng2-dragula';

@Component({
    moduleId: module.id,
    selector: 'create-task',
    templateUrl: './createTask.component.html',
    viewProviders: [DragulaService]
})
export class CreateTaskComponent {
    private componentData = null;

    constructor(
        private router: Router,
        private renderer: Renderer
    ) {

    }

    ngAfterViewInit() {
        setTimeout(function () {
            document.querySelector("body").classList.add("task-in");
        }, 0);
        document.querySelector(".close").addEventListener('click', this.close.bind(this));
    }

    addSingleTextField() {
        this.componentData = {
            component: InputFieldComponent,
            inputs: {
            }
        };
    }

    close() {
        document.querySelector("body").classList.remove("task-in");
        this.router.navigate([{ outlets: { 'task-router': null } }]);
    }
}


@Component({
    selector: 'input-field',
    template: "<div class='dnd-item' *ngIf='show'>" +
    "<div class='text-input'>" +
    "<input type='text'>" +
    "<label>Text Input</label>" +
    "</div>" +
    "<span class='delete-item' (click)='deleteMe()'><span>-</span></span>" +
    "</div>"
})
export class InputFieldComponent {
    private show: Boolean;

    constructor(private injector: Injector) {
        this.show = true;
    }

    deleteMe(){
        this.show = false;
    }
}