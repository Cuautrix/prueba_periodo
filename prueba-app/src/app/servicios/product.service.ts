import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { GLOBAL } from './GLOBAL';  
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    public url;
    constructor(
      private http: HttpClient,
    ) { 
      this.url =GLOBAL.url;
    }


//   comprar_boleto(id:any,data:any ,token:any): Observable<any>{
//     let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
//     return this.http.put(this.url+'comprar_boleto/'+id,data,{headers:headers});
//   }

//   cancelar_boletos(data:any,token:any): Observable<any>{
//     let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
//     return this.http.post(this.url+'cancelar_boletos',data,{headers:headers});
//   }

   get_products( ): Observable<any>{
     let headers = new HttpHeaders({'Content-Type':'application/json'});
     return this.http.get(this.url+'get_products/');
   }
//   cancelar_boleto( id:any,token:any): Observable<any>{
//     let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
//     return this.http.get(this.url+'cancelar_boleto/'+ id,{headers:headers});
//   }


}
