import { Component, OnInit, Output, Input, EventEmitter,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from './question.service';
import { LoginService } from '../login/login.service';
import { Question } from './question';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'question-create',
    templateUrl: './question-create.html',
    styleUrls: ['./question-create.component.css'],
    providers: [QuestionService, LoginService]
})

export class QuestionCreateComponent implements OnInit{
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
        private _questionService: QuestionService,
        private _loginService: LoginService,
        private toastr: ToastrService
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
        this.allTypeQuestion();
        //this.getAllTypeQuestion();
        //console.log('this.data: ',this.data)
    }

    allTypeQuestion() {
        console.log('lista de tipo de preguntas');
        this._questionService.allTypeQuestion(this.token.access_token)
        .subscribe(
            response => {
                this.typeQuestion = response.data;
                console.log('this.typeQuestion: ',this.typeQuestion);
            });   
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
                if(response.success) {
                    this.toastr.success(response.message, 'Guardar Pregunta');
                    //this.cleanForm();
                }else {
                    this.toastr.error(response.message, 'Error');
                }
                
            },
            error => {
                console.log('mensaje de error');
                this.toastr.error(error.error.message, 'Error');
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
        console.log(this.question.answers);
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
}