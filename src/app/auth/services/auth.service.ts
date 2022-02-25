import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Login} from "../models/login.model";
import {User} from "../models/user.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  getUser$(id:number):Observable<User>{
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url);
  }
  getUsers$():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
  deleteUser$(id:number):Observable<void>{
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }
  login$(data: Login):Observable<User>{
    return this.http.get<User[]>(this.url).pipe(
      map((response:User[]) =>{
        const user = response.find(u => u.username === data.username && u.password === data.password);
        if (user){
          return user;
        }
        return null as any;
      })
    );
  }
  logout():void{
    localStorage.removeItem('loggedUser');
  }

  storeUserData(user: User):void{
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getUserfromStorage():User{
    return JSON.parse(localStorage.getItem('loggedUser')!);
  }

  postUser$(user: User):Observable<User>{
    return this.http.post<User>(this.url,user)
  }

  register$(user: User) {
    return this.http.post<User>(this.url,user)
  }
  putUser$(user:User):Observable<User> {
    const url = `${this.url}/${user.id}`;
    return this.http.put<User>(url,user);
  }
}
