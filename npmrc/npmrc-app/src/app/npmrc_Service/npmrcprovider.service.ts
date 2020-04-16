import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { NpmrcConfig } from '../entity/NpmrcConfig';

@Injectable({
  providedIn: 'root'
})
export class NpmrcproviderService {

  constructor(private http: HttpClient) { }

  public key;
  public value;


  public _listUrl="http://localhost:8000/npmrc/config/";
  public _updateUrl="http://localhost:8000/npmrc/config/";
  public _deleteUrl="http://localhost:8000/npmrc/config/";
  public _viewUrl="";
  public _createUrl="http://localhost:8000/npmrc/config";

  listNpmrcConfigurations() : Observable<NpmrcConfig[]>{
    return this.http.get<NpmrcConfig[]>(this._listUrl);
  }

  delteConfigurations( keyVal):Observable<NpmrcConfig[]>{
    this.key= keyVal;
    return this.http.delete<NpmrcConfig[]>(this._deleteUrl+keyVal);
  }

  createNewConfiguration(k:string,v:string):Observable<NpmrcConfig[]>{
    this.key=k;
    this.value=v;
    return this.http.put<NpmrcConfig[]>(this._createUrl+"/"+this.key+"/"+this.value,{},{});
  }

  updateConfiguration(k:string,v:string):Observable<NpmrcConfig[]>{
    this.key=k;
    this.value=v;
    return this.http.put<NpmrcConfig[]>(this._createUrl+"/"+this.key+"/"+this.value,{},{});
  }
}
