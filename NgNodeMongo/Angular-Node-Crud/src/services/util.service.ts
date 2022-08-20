import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/movies';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  getAll(param: any): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+param);
    // page=1&size=5
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}?title=${title}`);
  }
}
