import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  private api_phases = 'http://127.0.0.1:8000/api/phases';
  private token = (new TokenService).getToken();
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  constructor(private http: HttpClient) { }

  getAllPhases() {
    return this.http.get(this.api_phases,{headers:this.headers});
  }

  getPhase(phaseId: number) {
    return this.http.get(`${this.api_phases}/${phaseId}`,{headers: this.headers});
  }

  createPhase(phase: any) {
    return this.http.post(this.api_phases,phase,{headers: this.headers});
  }

  updatePhase( phase: any,phaseId: number) {
    return this.http.put(`${this.api_phases}/${phaseId}`, phase,{headers: this.headers});
  }

  deletePhase(phaseId: number) {
    console.log('delete');
    return this.http.delete(`${this.api_phases}/${phaseId}`,{headers: this.headers});
  }
}
