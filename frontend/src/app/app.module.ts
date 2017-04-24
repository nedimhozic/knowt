import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ImageUploadModule } from 'ng2-imageupload';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ForgotPasswordComponent } from './components/user/forgotPass/forgotPass.component';
import { NewPasswordComponent } from './components/user/newPassword/newPassword.component';
import { TaskPanelComponent } from './components/task/taskPanel/taskPanel.component';
import { CalendarComponent } from './components/task/calendar/calendar.component';
import { ContractorComponent } from './components/task/contractor/contractor.component';
import { CreateTaskComponent, InputFieldComponent } from './components/task/createTask/createTask.component';
import { LogoComponent } from './components/shared/logo/logo.component';
import { DynamicComponent } from './components/shared/dynamic/dynamic.component';

import { routing } from './app.routing';
import { SharedModule } from './modules/shared.module';
import { BaseService } from './services/repository/base.service';
import { UserService } from './services/repository/user.service';
import { TaskService } from './services/repository/task.service';
import { ContractorService } from './services/repository/contractor.service';
import { TriggerService } from './services/shared/trigger.service';
import { HelperService } from './services/shared/helper.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    ImageUploadModule,
    DragulaModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    TaskPanelComponent,
    CalendarComponent,
    LogoComponent,
    ContractorComponent,
    CreateTaskComponent,
    DynamicComponent,
    InputFieldComponent
  ],
  providers: [
    BaseService,
    UserService,
    TaskService,
    TriggerService,
    HelperService,
    ContractorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
