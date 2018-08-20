import { Component, OnInit, Output, Input, EventEmitter,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { QuestionService } from './question.service';
import { LoginService } from '../login/login.service';
import { Question } from './question';

@Component({
    selector: 'question-edit',
    templateUrl: './question-edit.html',
    styleUrls: ['./question-create.component.css'],
    providers: [QuestionService, LoginService]
})

export class QuestionEditComponent implements OnInit{
    @Output() onAddAnswer = new EventEmitter();
    @Output() returnQuestion = new EventEmitter();
    //@Input() allQuestions;
    public title:string;
    public question: Question;
    public allQuestions;
    public typeQuestion;
    //public mostrar;
    public answerAlignment;
    public showtypeSelect;
    public textAlignment;
    public textTypeSelect;
    public error;
    public identity;
    public token;
    public answer;
    //public answers: Array<string> = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _questionService: QuestionService,
        private _loginService: LoginService
    ){
        this.identity = this._loginService.getIdentity();
        this.token = this._loginService.getToken();
        this.title = 'Componente de pregunta';
        //this.mostrar = false;
        this.answerAlignment = false;
        this.showtypeSelect = false;
        this.textAlignment = "Horizontal";
        this.textTypeSelect = "Multiple";

        this.question = new Question("",0,"",[]);
        //this.answers = new Array();
        this.getAllQuestions();
        
    }

    ngOnInit(){
        console.log('El componente question component ha sido cargado!');
        //this.getAllTypeQuestion();
        console.log('this.data edit: ',this.data)
    }

    typeSelect() {
        
        this.showtypeSelect = !this.showtypeSelect;
        console.log(this.showtypeSelect);
        if(this.showtypeSelect) {
            this.textTypeSelect = "Simple";
        }else {
            this.textTypeSelect = "Multiple";
        }
        
    }

    alignment() {
        this.answerAlignment = !this.answerAlignment;
        if(this.answerAlignment) {
            this.textAlignment = "Vertical";
        }else {
            this.textAlignment = "Horizontal";
        }
        
    }

    addQuestion(event) {
        console.log('guardar pregunta');
        console.log(this.question);
        this._questionService.addQuestion(this.question, this.token.access_token).subscribe(
            response => {
                console.log(response);
                this.returnQuestion.emit({data: response.data});
            },
            error => {
                console.log('mensaje de error');
                //console.log(error.message);
                this.error = error.error.message;
                console.log(<any>error.error.message);
            }
        );
    }

    addAnswer(answer: string):void {
        console.log('agregar respuestas de preguntas');
        if (answer) {
            this.question.answers.push(answer);
        }
        /*this.onAddAnswer.emit({
            name: 'Prueba',
            email: 'prueba@gmail.com',
            registration: 'May 11, 2016',
            isPremium: false
        });*/
        //console.log('agregar respuestas de preguntas');
        //this.answers = [...this.answers, this.answer];
        //this.refresh();
        //console.log(this.answers);
    }

    deleteAnswer(index: number):void {
        console.log('eliminar respuesta seleccionada');
        console.log(index);
        this.question.answers.splice(index, 1);
    }

    getAllQuestions() {
        this._questionService.allQuestions(this.token.access_token)
        .subscribe(
            questions => {
                this.allQuestions = questions.data;
                console.log(this.allQuestions);
                //localStorage.setItem('questions',JSON.stringify(this.allQuestions));
            });
    }

    editQuestion() {
        console.log(this.data.question);
        this._questionService.editQuestion(this.token.access_token, this.data.question)
        .subscribe(
            response => {
                console.log('response edit:', response);
                //localStorage.setItem('questions',JSON.stringify(this.allQuestions));
            });
    }
}