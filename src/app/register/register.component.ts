import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';

@Component({
    selector: 'register',
    templateUrl: './register.html'
})
export class RegisterComponent implements OnInit{
    public title:string;

    constructor(/*private _route: ActivatedRoute, private _router: Router*/){
        this.title = 'Componente de register'
    }

    ngOnInit(){
        console.log('El componente register component ha sido cargado!');
    }
}
