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

  getAllPhases() {
    return this.http.get(this.api_phases);
  }

  getPhase(phaseId: number) {
    return this.http.get(`${this.api_phases}/${phaseId}`);
  }

  createPhase(phase: any) {
    return this.http.post(this.api_phases,phase);
  }

  updatePhase( phase: any,phaseId: number) {
    return this.http.put(`${this.api_phases}/${phaseId}`, phase);
  }

  deletePhase(phaseId: number) {
    return this.http.delete(`${this.api_phases}/${phaseId}`);
  }
}
