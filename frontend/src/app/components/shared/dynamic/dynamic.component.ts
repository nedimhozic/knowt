import { Component, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Input } from '@angular/core';
import { InputFieldComponent } from '../../task/createTask/createTask.component';

@Component({
    selector: 'dynamic-component',
    entryComponents: [InputFieldComponent], // Reference to the components must be here in order to dynamically create them
    template: `
        <div [dragula]='"bag"' class='container dnd-container first' [dragula]='"bag"'>
            <div #dynamicComponentContainer></div>
        </div>
        <div [dragula]='"bag"' class='container dnd-container second' [dragula]='"bag"'></div>
        <div [dragula]='"bag"' class='container dnd-container third' [dragula]='"bag"'></div>
        <div [dragula]='"bag"' class='container dnd-container fourth' [dragula]='"bag"'></div>
  `,
})
export class DynamicComponent {
    currentComponent = null;
    currentComponents: Array<any> = [];

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver) {

    }

    // component: Class for the component you want to create
    // inputs: An object with key/value pairs mapped to input name/input value
    @Input() set componentData(data: { component: any, inputs: any }) {
        if (!data) {
            return;
        }

        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

        let factory = this.resolver.resolveComponentFactory(data.component);

        let component = factory.create(injector);

        this.dynamicComponentContainer.insert(component.hostView);

        this.currentComponents.push(component);
    }
}