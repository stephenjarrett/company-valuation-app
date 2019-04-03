import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  private apiUrl = `http://localhost:3000/industries`;

  constructor(private http: HttpClient) {}

  /**
   *
   */
  findAll(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
