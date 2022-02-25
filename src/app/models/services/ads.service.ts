import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Ad} from "../ad.model";




@Injectable({
  providedIn: 'root',
})
export class AdsService{
  private url = `${environment.apiUrl}/ads`;

  constructor(private http:HttpClient ) {
  }


  getAd$(id:number):Observable<Ad>{
    const url = `${this.url}/${id}`;
    return this.http.get<Ad>(url);
    }


  getAds$():Observable<Ad[]> {
    return this.http.get<Ad[]>(this.url);
  }
  postAds$(ad: Ad):Observable<Ad>{
    return this.http.post<Ad>(this.url,ad);
  }
  putAd$(ad:Ad):Observable<Ad>{
    const url = `${this.url}/${ad.id}`;
    return this.http.put<Ad>(url,ad);
  }

  deleteAd$(id: number):Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }
}
