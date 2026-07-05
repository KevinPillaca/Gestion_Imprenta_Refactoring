import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto,Categoria,CreateProducto,ApiResponse,UpdateProducto} from '../models/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private http = inject(HttpClient);
  
  // direccion del server
  private API_URL = 'http://localhost:3000/api/productos';

  
  getProducto():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.API_URL);
  };

  createProducto(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.API_URL, formData);
  }

  editProducto(id: number, datos: UpdateProducto):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.API_URL}/${id}`, datos)
  };

  deleteProducto(id:number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${`${this.API_URL}`}/${id}`)
  };

  //metodo para llamar los datos de la categoria
  getCategoria():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.API_URL}/categorias`);
  };

}
