import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BlurDirective } from '../directives/blur.directive';

@NgModule({
    declarations: [
        BlurDirective
    ],
    exports: [
        BlurDirective
    ]
})
export class SharedModule { }