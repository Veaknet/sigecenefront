import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import {QuestionCreateComponent} from '../question/question-create.component'; 
import { Question } from '../question/question';
import { QuestionService } from '../question/question.service';
import { StructureService } from './structure.service';
import { LoginService } from '../login/login.service';
import { Structure } from './structure';

@Component({
    selector: 'structure-list',
    templateUrl: './structure-list.html',
    providers: [QuestionService, StructureService, LoginService]
})

export class StructureListComponent implements OnInit{
    public title:string;
    public token;
    public error;
    public allStructures :any=[];

    constructor(private _questionService: QuestionService,
        private _structureService: StructureService,
        private _loginService: LoginService,
    ){
        this.title = 'Componente de plantillas';
        this.token = this._loginService.getToken();
        this.getAllStructures();
        //this.questions=JSON.parse(localStorage.getItem("questions"));
        //console.log("structuras: ",this.allStructures);
    }

    ngOnInit(){
        console.log('El componente plantillas ha sido cargado!');
    }

    getAllStructures() {
        this._structureService.allStructures(this.token.access_token)
        .subscribe(
            structures => {
                this.allStructures = structures.data;
                console.log('this.allStructures: ',this.allStructures);
            });
    }
}