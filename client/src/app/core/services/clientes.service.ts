import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cliente,CreateCliente,ApiResponse,ClienteResponse,TotalClientes} from '../models/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private http = inject(HttpClient);

  private API_URL = 'http://localhost:3000/api/clientes';

  //GET CLIENTES
  getClientes(buscar?: string, page:number = 1, limit: number = 8):Observable<ClienteResponse>{

    let params = new HttpParams().set('page', page).set('limit', limit);
    
    if (buscar) {
      params = params.set('buscar', buscar);
    }

    return this.http.get<ClienteResponse>(this.API_URL,{params});
  };

  //POST CLIENTES
  createClientes(cliente: CreateCliente): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.API_URL, cliente);
  };

  //PUT CLIENTES
  //DELETE CLIENTES

  //GET TOTAL CLIENTE
  getTotalCliente():Observable<TotalClientes>{
    return this.http.get<TotalClientes>(`${this.API_URL}/total`);
  };

}
