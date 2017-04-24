import {Directive, ElementRef, Renderer, HostListener, HostBinding, Input} from '@angular/core';

@Directive({
    selector: 'input'
})

export class BlurDirective {
  constructor(
        private renderer: Renderer,
        private el: ElementRef
    ){}

    @HostListener('blur') onBlur() {
        if(this.el.nativeElement.value){
            this.renderer.setElementClass(this.el.nativeElement, "not-empty", true);
        } else {
            this.renderer.setElementClass(this.el.nativeElement, "not-empty", false);
        }
    }
}