import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api_categories = 'http://127.0.0.1:8000/api/categories';
  private token = "5|JEBW5tuGQZ3M274gX975fHMlaoi9tm30YxOsjCFP2f5f4c24";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(this.api_categories,{headers:this.headers});
  }

  getCategory(categoryId: number) {
    return this.http.get(`${this.api_categories}/${categoryId}`,{headers:this.headers});
  }

  createCategory(category: any) {
    return this.http.post(this.api_categories,category,{headers:this.headers});
  }

  updateCategory( category: any,categoryId: number) {
    return this.http.put(`${this.api_categories}/${categoryId}`, category,{headers:this.headers});
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.api_categories}/${categoryId}`,{headers:this.headers});
  }
}
