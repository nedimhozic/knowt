import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ForgotPasswordComponent } from './components/user/forgotPass/forgotPass.component';
import { NewPasswordComponent } from './components/user/newPassword/newPassword.component';
import { TaskPanelComponent } from './components/task/taskPanel/taskPanel.component';
import { ContractorComponent } from './components/task/contractor/contractor.component';
import { CreateTaskComponent } from './components/task/createTask/createTask.component';

const appRoutes: Routes = [
    {
        path: '',
        component: TaskPanelComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'forgot',
        component: ForgotPasswordComponent
    },
    {
        path: 'newPassword',
        component: NewPasswordComponent
    },
    {
        path: 'contractor',
        component: ContractorComponent,
        outlet: 'task-router'
    },
    {
        path: 'create-task',
        component: CreateTaskComponent,
        outlet: 'task-router'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
