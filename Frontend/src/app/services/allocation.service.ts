import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl ='http://localhost:8080/api/allocatedStock';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
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
  findByOrderId(orderId: any): Observable<any> {
    return this.http.get(`${baseUrl}?orderId=${orderId}`);
  }
}
