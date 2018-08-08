import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Route } from '@angular/router/src/config';

@Component({
    selector: 'structure',
    templateUrl: './structure.html',
    //providers: [QuestionService, LoginService]
})

export class StructureComponent implements OnInit{

    constructor(private _route: ActivatedRoute, 
        private _router: Router
    ){

    }

    ngOnInit(){
        console.log('El componente question component ha sido cargado!');
    }
}