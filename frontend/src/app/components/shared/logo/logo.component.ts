import { Component, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'logo',
    templateUrl: `./logo.component.html`,
    styleUrls: ['./logo.component.css']
})
export class LogoComponent {
    constructor() {

    }

    ngAfterViewInit() {
        let element = document.getElementById("knowt_svg");
        element.addEventListener('click', function () {
            element.classList.add('active');
            setTimeout(function () {
                element.classList.remove('active');
            }, 1500);
        });
    }
}