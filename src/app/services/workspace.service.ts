import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public getworkspace:any;
  public postworkspace:any;
  constructor(private http:HttpClient) {

   }
   public showworkspaces(){
    this.http.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population').subscribe((data)=>{
      console.log(data);
      this.getworkspace = data;
    });  
   }
  ngOnInit():void {
    this.showworkspaces();
  }
}
