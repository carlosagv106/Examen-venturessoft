import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Marca } from '../interfaces/api-response.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class MarcaService {
  private baseUrl = `${environment.apiUrl}/Marcas`;

  constructor(private http: HttpClient) { }

  getMarcasPorCategoria(idMenu: number): Observable<Marca[]> {
    return this.http.get<ApiResponse<Marca>>(`${this.baseUrl}?idMenu=${idMenu}`).pipe(
      map(response => response.menuItems.map(item => ({
        idItem: item.idItem,
        nombreMarca: item.nombreMarca,
        descripción: item['descripción'],
        imagen: item.imagen
      })))
    );
  }
}