import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { GLOBAL } from '../global';

@Injectable()
export class StructureService {
   
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

    addStructure(structure, token) {    
        let urlStructure = this.url+"api/structures";

        let postData = {
            structure:{
                name: structure.name
            },
            questions: structure.questions

            
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

        return this._http.post<any>(urlStructure, postData, httpOptions);
    }

    allStructures(accessToken: string) {    
        let urlStructure = this.url+"api/structures";

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+accessToken
            })
        };

        return this._http.get<any>(urlStructure, httpOptions);
    }
}