import { Component, Input } from '@angular/core';
//import { Question } from './question/question';
 
@Component({
    selector: 'structure-view',
    templateUrl: './structure-view.html',
    //styleUrls: ['./structure-view.component.css'],
})
export class StructureViewComponent {
  @Input() question;
  //@Input('master') masterName: string;
}