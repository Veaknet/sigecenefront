import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { GLOBAL } from '../global';
//import { LoginService } from '../services/login.service';

@Injectable()
export class QuestionService {
   
    public url: string;
    public token;
    public identity;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
        console.log();
        //this.token = this._loginService.getToken();
        //this.identity = this._loginService.getIdentity();
        //console.log(this.identity.id);
    }

    addQuestion(question, token) {    
        let urlQuestion = this.url+"api/questions";

        let postData = {
            question:{
                user_id: question.user_id,
                question: question.question,
                type: question.typeQuestion,
                choice: question.choice
            },
            answers: question.answers

            
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

    allQuestions(accessToken: string) {    
        let urlUser = this.url+"api/questions";

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+accessToken
            })
        };

        return this._http.get<any>(urlUser, httpOptions);
    }
}