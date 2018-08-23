import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {QuestionCreateComponent} from '../question/question-create.component'; 
import {QuestionViewComponent} from '../question/question-view.component'; 
import { Question } from '../question/question';
import { QuestionService } from '../question/question.service';
import { StructureService } from './structure.service';
import { LoginService } from '../login/login.service';
import { Structure } from './structure';
import {SelectionModel} from '@angular/cdk/collections';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Component({
    selector: 'structure-questions',
    templateUrl: './structure-questions.html',
    styleUrls: ['./structure-questions.component.css'],
    providers: [QuestionService, StructureService, LoginService]
})

export class StructureQuestionsComponent implements OnInit{
    @Output() returnListQuestion = new EventEmitter();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['select', 'question', 'action'];
    selection = new SelectionModel(true, []);
    public dataSource;
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
        public dialog: MatDialog
    ){
        this.title = 'Componente de plantillas';
        this.token = this._loginService.getToken();
        this.showQuestion = false;
        this.getAllQuestions();
        //this.questions=JSON.parse(localStorage.getItem("questions"));
        console.log("preguntas",this.questions)
        this.structure = new Structure("",[]);
    }

    ngOnInit(){
        console.log('El componente plantillas ha sido cargado!');
    }

    sQuestion() {
        this.showQuestion = true;
    }

    getAllQuestions() {
        this._questionService.allQuestions(this.token.access_token)
        .subscribe(
            questions => {
                this.questions = questions.data;
                this.dataSource = new MatTableDataSource<PeriodicElement>(questions.data);
                this.dataSource.paginator = this.paginator;

                for (let i = 0; i < this.questions.length; i++) {
                    this.questions[i].checkbox = false;
                    console.log(this.questions[i]);
                }
                console.log(this.questions);
                //localStorage.setItem('questions',JSON.stringify(this.questions));
            });
    }

    onCheckboxChange(event, question) {
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
        this.returnListQuestion.emit({listdata: this.questionsStructure});
        console.log('this.questionsStructure: ', this.questionsStructure);
        //console.log('this.structure.questions: ', this.structure.questions);
    }

    addStructure() {
        console.log('guardar structura');
        console.log('this.questionsStructure: ', this.questionsStructure);
        for (let i = 0; i < this.questionsStructure.length; i++) {
            this.structure.questions.push(this.questionsStructure[i].id);
        }
        console.log('this.structure.questions: ', this.structure.questions);

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

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    
      /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));   
    }

    selectToggle(row) {
        this.selection.toggle(row);
        this.returnListQuestion.emit({listdata: this.selection.selected});
        console.log('this.selection: ',this.selection.selected);

    }

    openDialogView(id) {
        this._questionService.getQuestion(this.token.access_token, id)
        .subscribe(
        response => {
            let question = response.data;
            console.log('response:', response);
            this.dialog.open(QuestionViewComponent, {
                data: question
            });
        });
    }
}