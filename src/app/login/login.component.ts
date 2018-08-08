import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Route } from '@angular/router/src/config';
import { LoginService } from './login.service';
//import { User } from '../models/user';
//import { UserService } from '../services/user.services';
//import {User} from '../services/user';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit{
    public title:string;
    public user;
    public identity;
    public token;
    public error;

    constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService){
        this.title = 'Componente de login';
        this.user = {
            "email":"",
            "password":""
        }
        /*this._userService.getAccessToken()
        .subscribe(data => {
            this.getUsers(data.access_token)
        });*/
    }

    ngOnInit(){
        console.log('El componente login component ha sido cargado!');
        //console.log(this._loginService.getIdentity());

    }

    onSubmitLogin() {
        console.log('submit login');
        //let user = new User(this.email,this.password);
        
        this._loginService.login(this.user).subscribe(
            response => {
                //let identity = response;
                //console.log(JSON.stringify(response));
                if(response.access_token){
                    localStorage.setItem('token', JSON.stringify(response));
                    this.getUser(response.access_token);
                }
            },
            error => {
                console.log('mensaje de error');
                //console.log(error.message);
                this.error = error.error.message;
                console.log(<any>error.error.message);
            }
        );
    }

    getUser(accessToken: string) {
        this._loginService.getUser(accessToken, this.user.email)
            .subscribe(
                user => {
                    this.identity = user;
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = '/forms';
                    //console.log(user);
                });
    }
}

