import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { NgForm } from '@angular/forms';
import { QuestionService } from './question.service';
import { LoginService } from '../login/login.service';
import { Question } from './question';
import {CdkTableModule} from '@angular/cdk/table';

@Component({
    selector: 'question-list',
    templateUrl: './question-list.html',
    providers: [QuestionService, LoginService]
})

export class QuestionListComponent implements OnInit{
    displayedColumns: string[] = ['pregunta', 'tipo'];
    public dataSource;    
    public title:string;
    public question: Question;
    public allQuestions;
    public token;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    //public page: number;

    constructor(
        private _questionService: QuestionService,
        private _loginService: LoginService
    ){
        //this.identity = this._loginService.getIdentity();
        this.token = this._loginService.getToken();
        this.title = 'Componente de pregunta';
        //this.page = 1;
        //this.question = new Question(this.identity.id,"","","",[]);
        //this.answers = new Array();
        this.getAllQuestions();
        this.dataSource = new MatTableDataSource<Question>(this.allQuestions);
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(){
        console.log('El componente question component ha sido cargado!');
    }

    getAllQuestions() {
        this._questionService.allQuestions(this.token.access_token)
        .subscribe(
            questions => {
                this.allQuestions = questions.data.data;
                console.log('result questions:', questions)
                console.log(this.allQuestions);
            });
    }
}