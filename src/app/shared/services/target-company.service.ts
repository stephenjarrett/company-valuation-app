import { TargetCompany } from '../models/target-company.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TargetCompanyService {
    private apiUrl = `http://localhost:3000/target-companies`;

    constructor(private http: HttpClient) {
    }

    /**
     *
     */
    create(targetCompany: TargetCompany): Observable<TargetCompany> {
        return this.http.post<TargetCompany>(this.apiUrl, targetCompany);
    }

    /**
     *
     */
    findById(id: number): Observable<TargetCompany> {
        return this.http.get<TargetCompany>(`${this.apiUrl}/${id}`);
    }

    /**
     *
     */
    findAll(): Observable<TargetCompany[]> {
        return this.http.get<TargetCompany[]>(this.apiUrl);
    }

    /**
     *
     */
    update(targetCompany: TargetCompany): Observable<TargetCompany> {
        return this.http.put<TargetCompany>(this.apiUrl, targetCompany);
    }

    /**
     *
     */
    deleteById(id: number): Observable<TargetCompany> {
      return this.http.delete<TargetCompany>(`${this.apiUrl}/${id}`);
    }
}
