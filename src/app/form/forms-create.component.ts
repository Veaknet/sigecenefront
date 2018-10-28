import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import { LoginService } from '../login/login.service';
import { StructureService } from '../structure/structure.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionCreateComponent} from '../question/question-create.component';

@Component({
    selector: 'inquiry',
    templateUrl: './forms-create.html',
    providers: [StructureService, LoginService]
})
export class FormsCreateComponent implements OnInit{
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    showCreateQuestion = false;
    showListQuestions = false;
    showListStructures = false;
    questions:any=[];;
    public title:string;
    public showQuestionNew;
    //public showListQuestions;
    //public showListStructures;  
    public form:any=[];
    public questionsStructure:any[];

    constructor(private _route: ActivatedRoute, 
        private _router: Router,
        private _loginService: LoginService,
        private _structureService: StructureService,
        private _formBuilder: FormBuilder
    ){
        this.title = 'Componente de formulario';
        this.showQuestionNew = false;
        this.showListQuestions = false;
        this.showListStructures = false;
    }

    ngOnInit(){
        console.log('El componente forms component ha sido cargado!');
        this.firstFormGroup = this._formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            image: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

    responseQuestion(event):void {
        console.log('data: ',event.data);
        event.data.checkbox = true;
        this.questions.push(event.data);
        //this.questionsStructure.push(event.data);
        //this.structure.questions.push(event.data.id);
        //alert();
    }

    responseListQuestion(event):void {
        console.log('lista de preguntas: ', event.listdata);
        this.questionsStructure = event.listdata;
        //this.questions.push(event.listdata);
    }

    addListQuestions() {
        for (let i = 0; i < this.questionsStructure.length; i++) {
            this.form.push({"question": this.questionsStructure[i]});
        }
        console.log("this.form: ", this.form);
    }
}