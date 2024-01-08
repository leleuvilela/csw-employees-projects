import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { api } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class PlatoonService {
  private baseUrl = 'http://localhost:3000/api/platoons';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPlatoons(): Observable<api.platoons.Platoon[]> {
    return this.http.get<api.platoons.Platoon[]>(`${this.baseUrl}`).pipe(shareReplay(1));
  }

  getPlatoon(id: number): Observable<api.platoons.Platoon> {
    return this.http.get<api.platoons.Platoon>(`${this.baseUrl}/${id}`);
  }

  createPlatoon(platoon: api.platoons.CreatePlatoonDto): Observable<api.platoons.Platoon> {
    return this.http.post<api.platoons.Platoon>(`${this.baseUrl}`, platoon, this.httpOptions);
  }

  updatePlatoon(id: number, platoon: api.platoons.UpdatePlatoonDto): Observable<api.platoons.Platoon> {
    return this.http.patch<api.platoons.Platoon>(`${this.baseUrl}/${id}`, platoon, this.httpOptions);
  }

  deletePlatoon(id: number): Observable<never> {
    return this.http.delete<never>(`${this.baseUrl}/${id}`);
  }
}
