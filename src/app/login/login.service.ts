import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { GLOBAL } from '../global';
//import {User} from '../models/user';

@Injectable()
export class LoginService {
   
    public url: string;
    public token;
    public identity;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    login(user){
        //console.log(user.email);
        let postData = {
            grant_type: "password",
            client_id: '5',
            client_secret: "yy8rcK8MReQ4rxAVv6wz7Ke9xtsU4qJzzY22wbiZ",
            username: user.email,
            password: user.password,
            scope: ""
        }

        return this._http.post<any>(this.url+"oauth/token", postData);
    }

    //getUsers(accessToken: string): Observable<User[]> {
    getUser(accessToken: string, email: string) {    
        /*var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + accessToken,
        });*/
        let urlUser = this.url+"api/user/"+email;

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+accessToken
            })
        };

        return this._http.get<any>(urlUser, httpOptions);
        /*return this.http.get(this.usersUrl, {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));*/
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('user'));
        if(identity != 'undefined') {
            this.identity = identity;
        }else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        let token = JSON.parse(localStorage.getItem('token'));
        if(token != 'undefined') {
            this.token = token;
        }else {
            this.token = null;
        }
        //console.log('getToken');
        //console.log(this.token.access_token);
        return this.token;
    }
}