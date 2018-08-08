import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import {QuestionCreateComponent} from '../question/question-create.component'; 
import { Question } from '../question/question';
import { StructureService } from '../structure/structure.service';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'form-structure',
    templateUrl: './form-structure.html',
    providers: [StructureService, LoginService]
})
export class FormStructureComponent implements OnInit{
    @Output() returnListQuestion = new EventEmitter();

    public title:string;
    public token;
    public error;
    public structures :any=[];

    constructor(private _structureService: StructureService,
        private _loginService: LoginService,
    ){
        this.title = 'Componente de plantillas';
        this.token = this._loginService.getToken();
        this.getStructures();
    }

    ngOnInit(){
        console.log('El componente plantillas ha sido cargado!');
    }

    getStructures() {
        this._structureService.allStructures(this.token.access_token)
        .subscribe(
            structures => {
                this.structures = structures.data;
                console.log("this.structures. ",this.structures);
            });
    }

    onCheckboxChange(event, question) {
        /*console.log('seleccione una pregunta');

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
        this.returnListQuestion.emit({listdata: this.questionsStructure});
        console.log('this.questionsStructure: ', this.questionsStructure);
        //console.log('this.structure.questions: ', this.structure.questions);*/
    }

    addStructure() {
        /*console.log('guardar structura');
        console.log('this.questionsStructure: ', this.questionsStructure);
        for (let i = 0; i < this.questionsStructure.length; i++) {
            this.structure.questions.push(this.questionsStructure[i].id);
        }
        console.log('this.structure.questions: ', this.structure.questions);*/

        /*this._structureService.addStructure(this.structure, this.token.access_token).subscribe(
            response => {
                console.log('response: ', response);
            },
            error => {
                console.log('mensaje de error');
                //console.log(error.message);
                this.error = error.error.message;
                console.log(<any>error.error.message);
            }
        );*/
    }

    addQuestion() {
        //console.log('agregar pregunta nueva');
    }

    responseQuestion(event):void {
        /*console.log('data: ',event.data);
        event.data.checkbox = true;
        this.questions.push(event.data);
        this.questionsStructure.push(event.data);
        //this.structure.questions.push(event.data.id);*/
        //alert();
    }
}