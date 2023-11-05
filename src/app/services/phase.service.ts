import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  /* private api_phases = 'http://127.0.0.1:8000/api/phases'; */
  private api_phases = 'https://test-backend.exoticmarkets-co.com/api/phases';
  
  constructor(private http: HttpClient) { }
  
  private token = "2|W8NLCVm5cfu5hDOlu0i4SDzIu8FT8dJCxG6oIJAw5f915f2a";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  getAllPhases() {
    return this.http.get(this.api_phases,{headers:this.headers});
  }

  getPhase(phaseId: number) {
    return this.http.get(`${this.api_phases}/${phaseId}`,{headers:this.headers});
  }

  createPhase(phase: any) {
    return this.http.post(this.api_phases,phase,{headers:this.headers});
  }

  updatePhase( phase: any,phaseId: number) {
    return this.http.put(`${this.api_phases}/${phaseId}`, phase,{headers:this.headers});
  }

  deletePhase(phaseId: number) {
    return this.http.delete(`${this.api_phases}/${phaseId}`,{headers:this.headers});
  }
}
