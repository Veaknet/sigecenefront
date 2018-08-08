import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { GLOBAL } from '../global';
//import { LoginService } from '../services/login.service';

@Injectable()
export class UserService {
   
    public url: string;
    public token;
    public identity;

    constructor(private _http: HttpClient){
        this.url = 'GLOBAL.url';
    }

    listUser () {

    }

    addUser(question, token) {    
        let urlQuestion = this.url+"api/questions";

        let postData = {
            user_id: question.user_id,
            question: question.inquiry
        }

        console.log('postData');
        console.log(postData);

        console.log('token');
        //console.log(this.token.access_token);

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+token
            })
        };

        return this._http.post<any>(urlQuestion, postData, httpOptions);
    }
}