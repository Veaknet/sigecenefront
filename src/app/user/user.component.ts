import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import { LoginService } from '../login/login.service';
import { UserService } from './user.service';

@Component({
    selector: 'user',
    templateUrl: './user.html',
    providers: [LoginService,UserService]
})

export class UserComponent implements OnInit{
    public title:string;
    public user;
    public identity;
    public token;
    public error;

    constructor(
        private _route: ActivatedRoute, 
        private _router: Router, 
        private _loginService: LoginService, 
        private _userService: UserService
    ){
        this.title = 'Componente de login';
    }

    ngOnInit(){
        console.log('El componente login component ha sido cargado!');
        //console.log(this._loginService.getIdentity());

    }

}