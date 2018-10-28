import { NgModule, Component, OnInit, Output, Input, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { QuestionCreateComponent } from './question-create.component';
import { QuestionEditComponent } from './question-edit.component';
import { QuestionViewComponent } from './question-view.component';
import { QuestionDeleteComponent } from './question-delete.component';
import { QuestionService } from './question.service';
import { LoginService } from '../login/login.service';
import { Question } from './question';
import { DataSource } from '@angular/cdk/table';
import { ToastrService } from 'ngx-toastr';

export interface Element {
    user_id: number,
    question: string,
    type: number,
    choice: string,
    /*answers: Array<string>,
    created_at: string,
    updated_at: string  */  
}

export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion'; 
}

@Component({
    selector: 'question-list',
    templateUrl: './question-list.html',
    styleUrls: ['./question-list.component.css'],
    providers: [QuestionService, LoginService]
})

export class QuestionListComponent implements OnInit{
    dataSource;
    //displayedColumns = [];
    displayedColumns: string[] = ['question', 'type', 'action'];
    //public dataSource;    
    public title:string;
    public question: Question;
    public allQuestions;
    public token;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    //public page: number;
    columnNames = [{
        id: "question",
        value: "Question"

      }, {
        id: "type_question",
        value: "Type"
      }, {
        id: "accion",
        value: "Accion"
      }];

    constructor(
        private _questionService: QuestionService,
        private _loginService: LoginService,
        public dialog: MatDialog,
        private toastr: ToastrService
    ){
        //this.identity = this._loginService.getIdentity();
        this.token = this._loginService.getToken();
        this.title = 'Componente de pregunta';
        //this.page = 1;
        //this.question = new Question(this.identity.id,"","","",[]);
        //this.answers = new Array();
        //this.getAllQuestions();
        //this.dataSource = new MatTableDataSource<Question>(this.allQuestions);
        //this.dataSource.paginator = this.paginator;
    }

    ngOnInit(){
        console.log('El componente question component ha sido cargado!');
        //this.displayedColumns = this.columnNames.map(x => x.id);
        //this.dataSource.paginator = this.paginator;
        this.getAllQuestions();
        //this.createTable();
    }

    getAllQuestions() {
        this._questionService.allQuestions(this.token.access_token)
        .subscribe(
        questions => {
            this.allQuestions = questions.data;
            //let tableArr: Question[] = this.allQuestions;
            console.log('tableArr:', this.allQuestions);
            let prueba = this.allQuestions.map(question => console.log(question));
            //let prueba = this.allQuestions.map(question => question.type_question_id = question.type_question.name);
            //console.log('variable prueba: ', prueba);
            this.dataSource = new MatTableDataSource(this.allQuestions);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log('result questions:', questions)
            console.log(this.allQuestions);
        });
    }

    editQuestion(id) {
        console.log('id de pregunta para editar: ', id);
    }

    openDialogView(id) {
        this._questionService.getQuestion(this.token.access_token, id)
        .subscribe(
        response => {
            let question = response.data;
            console.log('response:', response);
            this.dialog.open(QuestionViewComponent, {
                data: question
            });
        });
    }

    openDialogEdit(id) {
        let typeQuestion;
        this._questionService.allTypeQuestion(this.token.access_token)
        .subscribe(
            response => {
                typeQuestion = response.data;
            });
        
        this._questionService.getQuestion(this.token.access_token, id)
        .subscribe(
        response => {
            let question = response.data;
            console.log('response:', response);
            this.dialog.open(QuestionEditComponent, {
                height: '400px',
                width: '600px',
                data: {question, typeQuestion}
            });
        });
    }

    openDialogDelete(question) {
        console.log('borrar pregunta: ', question.id);
        const dialogRef = this.dialog.open(QuestionDeleteComponent, {});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if(result) {
                this._questionService.deleteQuestion(this.token.access_token, question.id)
                .subscribe(
                response => {
                    //let question = response.data;
                    console.log('response.success: ', response.success);
                    if(response.success) {
                        this.toastr.success(response.message, 'Eliminar Pregunta');
                        let index = this.allQuestions.indexOf(question);
                        console.log('index: ', index);
                        this.allQuestions.splice(index, 1);
                        this.dataSource = new MatTableDataSource(this.allQuestions);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                    }
                    
                    console.log('response:', response);
                    
                });
            }
        });
        /*this._questionService.deleteQuestion(this.token.access_token, id)
        .subscribe(
        response => {
            let question = response.data;
            console.log('response:', response);
            
        });*/
    }

    /*openDialogCreate() {
        console.log('lista de tipo de preguntas');
        this._questionService.allTypeQuestion(this.token.access_token)
        .subscribe(
            response => {
                let typeQuestion = response.data;
                this.dialog.open(QuestionCreateComponent, {
                    height: '400px',
                    width: '600px',
                    data: typeQuestion
                });
                console.log('this.typeQuestion: ',typeQuestion);
            });
        
    }*/

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

