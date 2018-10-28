import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import {QuestionCreateComponent} from '../question/question-create.component'; 
import { Question } from '../question/question';
import { QuestionService } from '../question/question.service';
import { StructureService } from './structure.service';
import { LoginService } from '../login/login.service';
import { Structure } from './structure';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'structure-create',
    templateUrl: './structure-create.html',
    styleUrls: ['./structure-create.component.css'],
    providers: [QuestionService, StructureService, LoginService]
})
export class StructureCreateComponent implements OnInit{
    isLinear = false;
    showCreateQuestion = false;
    showListQuestions = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    public title:string;
    public token;
    public error;
    public showQuestion;
    public structure: Structure;
    public questions :any=[];
    public questionsStructure :any=[];

    constructor(private _questionService: QuestionService,
        private _structureService: StructureService,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder,
        private toastr: ToastrService
    ){
        this.title = 'Componente de plantillas';
        this.token = this._loginService.getToken();
        this.showQuestion = false;
        //this.getAllQuestions();
        //this.questions=JSON.parse(localStorage.getItem("questions"));
        console.log("preguntas",this.questions)
        this.structure = new Structure("",[]);
    }

    ngOnInit(){
        console.log('El componente plantillas ha sido cargado!');
        this.firstFormGroup = this._formBuilder.group({
            name: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

    sQuestion() {
        this.showQuestion = true;
    }

    /*getAllQuestions() {
        this._questionService.allQuestions(this.token.access_token)
        .subscribe(
            questions => {
                this.questions = questions.data;
                for (let i = 0; i < this.questions.length; i++) {
                    this.questions[i].checkbox = false;
                    console.log(this.questions[i]);
                }
                console.log(this.questions);
                localStorage.setItem('questions',JSON.stringify(this.questions));
            });
    }

    onCheckboxChange(question ) {
        console.log('seleccione una pregunta');

        question.checkbox =  !question.checkbox;
        if(question.checkbox) {
            this.questionsStructure.push(question);
            //this.structure.questions.push(question.id);
            //console.log('this.structure.questions: ', this.structure.questions);
        }else {
            let index = this.questionsStructure.indexOf(question);
            this.questionsStructure.splice(index, 1);
            //this.structure.questions.splice(index, 1);
        }

        console.log('this.questionsStructure: ', this.questionsStructure);
        //console.log('this.structure.questions: ', this.structure.questions);
    }*/

    addStructure() {
        console.log('guardar structura');
        console.log('this.questionsStructure: ', this.questionsStructure);
        console.log('firstFormGroup: ', this.firstFormGroup);

        for (let i = 0; i < this.questionsStructure.length; i++) {
            this.structure.questions.push(this.questionsStructure[i].id);
        }
        console.log('this.structure.questions: ', this.structure.questions);
        console.log('this.structure: ', this.firstFormGroup.get('name').value );
        this.structure.name = this.firstFormGroup.get('name').value;
        console.log('this.structure: ', this.structure );
        this._structureService.addStructure(this.structure, this.token.access_token).subscribe(
            response => {
                console.log('response: ', response);
                if(response.success) {
                    this.toastr.success(response.message, 'Guardar Plantilla');
                    //this.cleanForm();
                }else {
                    this.toastr.error(response.message, 'Error');
                }
            },
            error => {
                console.log('mensaje de error');
                //console.log(error.message);
                this.error = error.error.message;
                console.log(<any>error.error.message);
            }
        );
    }

    addQuestion() {
        console.log('agregar pregunta nueva');
    }

    responseQuestion(event):void {
        console.log('data: ',event.data);
        event.data.checkbox = true;
        this.questions.push(event.data);
        this.questionsStructure.push(event.data);
        //this.structure.questions.push(event.data.id);
        //alert();
    }

    responseListQuestion(event):void {
        console.log('lista de preguntas: ', event.listdata);
        this.questionsStructure = event.listdata;
    }
}