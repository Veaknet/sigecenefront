import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsCreateComponent } from './form/forms-create.component';
import { QuestionComponent } from './question/question.component';
import { QuestionCreateComponent } from './question/question-create.component';
import { QuestionEditComponent } from './question/question-edit.component';
import { StructureComponent } from './structure/structure.component';
import { StructureCreateComponent } from './structure/structure-create.component';
//import { TemplateComponent } from './components/template.component';

const appRoutes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forms', component: FormsCreateComponent},
    {path: 'question', component: QuestionComponent},
    {path: 'questioncreate', component: QuestionCreateComponent},
    {path: 'questionedit/:id', component: QuestionEditComponent},
    {path: 'structure', component: StructureComponent},
    {path: 'structurecreate', component: StructureCreateComponent},
    {path:'**', component: LoginComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);