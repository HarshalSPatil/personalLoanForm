import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataapiService {

  constructor(private http:HttpClient) { }
  sendservice(fromdata:FormData):Observable<any>
  {
    return this.http.post<any>('http://lab.thinkoverit.com/api/getOTP.php',fromdata)

  }
}
