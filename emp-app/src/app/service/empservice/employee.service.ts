import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/entity/IEmployee';
import { Profile } from 'src/app/entity/Profile';
//import 'rxjs/add/operator/catch'
//import 'rxjs/add/observable/throw'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(){
    return [
        { "id" : 10, "empName": "John", "age": 34, "salary" : 20000},
        { "id" : 20, "empName": "Ajith", "age": 24, "salary" : 2000},
       

    ];
  }

  public _url="/assets/data/employees.json";
  
  public _profileUrl = "http://localhost:8000/profiles/3";

  public _profiles="http://localhost:8000/profiles";

  getEmployeesFromFile() : Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url);
  }

  public prId = 1;

  /*getProfileId() : Observable<any>{
    return this.http.get<any>(this._profileUrl);
  }*/

  setProfileId(id:number){
    this.prId=id;
  }
  getProfileUsingId():Observable<Profile>{
    return this.http.get<Profile>(this._profileUrl);
  }
 /* getEmployeeWithErrorHandling():Observable<IEmployee[]>{
    
    return this.http.get<IEmployee[]>(this._url).catch(this.errorHandler);
  } */

 /* errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  } */

  
  getProfiles():Observable<Profile[]>{
    return this.http.get<Profile[]>(this._profiles);
  }
}
