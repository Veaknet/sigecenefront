import { Component, OnInit, Output, Input, EventEmitter,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'question-view',
    templateUrl: './question-view.html',
    styleUrls: ['./question-view.component.css'],
    //providers: [QuestionService, LoginService]
})

export class QuestionViewComponent implements OnInit{

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
    
        ngOnInit() {
            console.log('this.data: ',this.data);
        }
}