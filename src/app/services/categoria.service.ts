import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiResponse, Categoria } from '../interfaces/api-response.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}/Categorias`;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<ApiResponse<Categoria>>(this.apiUrl).pipe(
      map(response => response.menuItems.map(item => ({
        idMenu: item.idMenu,
        descripción: item['descripción']
      })))
    );
  }
}
  
  
