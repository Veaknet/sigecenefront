import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {QuestionCreateComponent} from '../question/question-create.component'; 
import { Question } from '../question/question';
import { QuestionService } from '../question/question.service';
import { StructureService } from './structure.service';
import { LoginService } from '../login/login.service';
import { Structure } from './structure';
import { DataSource } from '@angular/cdk/table';

export interface Element {
    user_id: number,
    name: string
}

@Component({
    selector: 'structure-list',
    templateUrl: './structure-list.html',
    providers: [QuestionService, StructureService, LoginService]
})

export class StructureListComponent implements OnInit{
    public dataSource;
    public title:string;
    public token;
    public error;
    public allStructures :any=[];
    public displayedColumns = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    columnNames = [{
        id: "name",
        value: "Nombre"
      },
      {
        id: "accion",
        value: "Accion"
    }];

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
        this.displayedColumns = this.columnNames.map(x => x.id);
    }

    getAllStructures() {
        this._structureService.allStructures(this.token.access_token)
        .subscribe(
            structures => {
                //this.allStructures = structures.data;
                let tableArr: Structure[] = structures.data;
                console.log('tableArr:', tableArr);
                this.dataSource = new MatTableDataSource(tableArr);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                //console.log('this.allStructures: ',this.allStructures);
            });
    }
}