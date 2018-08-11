import { NgModule, Component, OnInit, Output, Input, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { QuestionService } from './question.service';
import { LoginService } from '../login/login.service';
import { Question } from './question';
import { DataSource } from '@angular/cdk/table';

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
    providers: [QuestionService, LoginService]
})

export class QuestionListComponent implements OnInit{
    dataSource;
    displayedColumns = [];
    //displayedColumns: string[] = ['pregunta', 'tipo'];
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
        id: "type",
        value: "Type"
      }, {
        id: "accion",
        value: "Accion"
      }];

    constructor(
        private _questionService: QuestionService,
        private _loginService: LoginService,
        public dialog: MatDialog
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
        this.displayedColumns = this.columnNames.map(x => x.id);
        //this.dataSource.paginator = this.paginator;
        this.getAllQuestions();
        this.createTable();
    }

    getAllQuestions() {
        this._questionService.allQuestions(this.token.access_token)
        .subscribe(
        questions => {
            this.allQuestions = questions.data;
            let tableArr: Element[] = this.allQuestions;
            console.log('tableArr:', tableArr);
            this.dataSource = new MatTableDataSource(tableArr);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log('result questions:', questions)
            console.log(this.allQuestions);
        });
    }

    editQuestion(id) {
        console.log('id de pregunta para editar: ', id);
    }

    createTable() {
        /*let tableArr: Element[] = [{ user_id: 1, question: 'Hydrogen', type: 1.0079, choice: 'H' },
        { user_id: 2, question: 'Helium', type: 4.0026, choice: 'He' },
        { user_id: 3, question: 'Lithium', type: 6.941, choice: 'Li' },
        { user_id: 4, question: 'Beryllium', type: 9.0122, choice: 'Be' },
        { user_id: 5, question: 'Boron', type: 10.811, choice: 'B' },
        { user_id: 6, question: 'Carbon', type: 12.0107, choice: 'C' }
        ];*/
        let tableArr: Element[] = this.allQuestions;
        console.log('tableArr:', tableArr);
        this.dataSource = new MatTableDataSource(tableArr);
        //this.dataSource.sort = this.sort;
    }

    openDialogView(id) {
        this._questionService.getQuestion(this.token.access_token, id)
        .subscribe(
        response => {
            let question = response.data;
            console.log('response:', response);
            this.dialog.open(DialogDataExampleDialog, {
                data: question
            });
        });
        
    }
}

@Component({
    selector: 'aqqquestion-create',
    templateUrl: './question-view.html',
  })
  export class DialogDataExampleDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        // will log the entire data object
        console.log('this.data: ',this.data)
      }
  }