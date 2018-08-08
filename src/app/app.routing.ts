import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsComponent } from './form/forms.component';
import { QuestionComponent } from './question/question.component';
import { StructureComponent } from './structure/structure.component';
//import { TemplateComponent } from './components/template.component';

const appRoutes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forms', component: FormsComponent},
    {path: 'question', component: QuestionComponent},
    {path: 'structure', component: StructureComponent},
    {path:'**', component: LoginComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);