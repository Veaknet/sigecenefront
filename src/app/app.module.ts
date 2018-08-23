import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule} from '@angular/material';
import { MatPaginatorModule, MatSortModule, MatIconModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
//import { DragulaModule } from 'dragula';
//import {HttpClient} from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionComponent } from './question/question.component';
import { QuestionCreateComponent } from './question/question-create.component';
import { QuestionEditComponent } from './question/question-edit.component'
import { QuestionListComponent,  } from './question/question-list.component';
import { QuestionViewComponent } from './question/question-view.component';
import { QuestionDeleteComponent } from './question/question-delete.component';
import { StructureComponent } from './structure/structure.component';
import { StructureCreateComponent } from './structure/structure-create.component';
import { StructureListComponent } from './structure/structure-list.component';
import { StructureQuestionsComponent } from './structure/structure-questions.component';
import { FormsComponent } from './form/forms.component';
import { FormStructureComponent } from './form/form-structure.component';
import { AdminComponent } from './layout/admin/admin.component';
//import { LoginService } from './login/login.service';
//import { UserService } from './services/user.services';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    QuestionComponent,
    QuestionCreateComponent,
    QuestionListComponent,
    QuestionDeleteComponent,
    StructureComponent,
    StructureCreateComponent,
    StructureListComponent,
    StructureQuestionsComponent,
    AdminComponent,
    FormsComponent,
    FormStructureComponent,
    QuestionEditComponent,
    QuestionViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    //DragulaModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    MatListModule,
    MatStepperModule,
    MatMenuModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    //LoginService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    QuestionViewComponent,
    QuestionDeleteComponent
  ]
})
export class AppModule { }
