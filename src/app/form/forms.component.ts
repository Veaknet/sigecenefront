import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import { LoginService } from '../login/login.service';
import { StructureService } from '../structure/structure.service';

@Component({
    selector: 'inquiry',
    templateUrl: './forms.html',
    providers: [StructureService, LoginService]
})
export class FormsComponent implements OnInit{
    public title:string;
    public showQuestionNew;
    public showListQuestions;
    public showListStructures;  
    public form:any=[];
    public questionsStructure:any[];

    constructor(private _route: ActivatedRoute, 
        private _router: Router,
        private _loginService: LoginService,
        private _structureService: StructureService
    ){
        this.title = 'Componente de formulario';
        this.showQuestionNew = false;
        this.showListQuestions = false;
        this.showListStructures = false;
    }

    ngOnInit(){
        console.log('El componente forms component ha sido cargado!');
    }

    responseQuestion(event):void {
        console.log('data: ',event.data);
        event.data.checkbox = true;
        this.form.push({"question": event.data});
        console.log("this.form: ", this.form);
        //this.structure.questions.push(event.data.id);
        //alert();
    }

    responseListQuestion(event):void {
        console.log('lista de preguntas: ', event.listdata);
        this.questionsStructure = event.listdata;
    }

    addListQuestions() {
        for (let i = 0; i < this.questionsStructure.length; i++) {
            this.form.push({"question": this.questionsStructure[i]});
        }
        console.log("this.form: ", this.form);
    }
}