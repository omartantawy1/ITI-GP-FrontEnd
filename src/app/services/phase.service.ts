import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  private api_phases = 'http://127.0.0.1:8000/api/phases';

  constructor(private http: HttpClient) { }

  getAllPhases(): Observable<Phase[]> {
    return this.http.get<Phase[]>(this.api_phases);
  }

  getPhase(phaseId: number): Observable<Phase> {
    return this.http.get<Phase>(`${this.api_phases}/${phaseId}`);
  }

  createPhase(phase: Phase): Observable<Phase> {
    return this.http.post<Phase>(this.api_phases, phase);
  }

  updatePhase(phaseId: number, phase: Phase): Observable<Phase> {
    return this.http.put<Phase>(`${this.api_phases}/${phaseId}`, phase);
  }

  deletePhase(phaseId: number): Observable<void> {
    return this.http.delete<void>(`${this.api_phases}/${phaseId}`);
  }
}
