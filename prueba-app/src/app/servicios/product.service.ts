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

   
   insert_product(data:any, file: any,token:any): Observable<any>{
    let headers = new HttpHeaders({'authorization':token});
    const fd = new FormData();
    fd.append('name',data.name);
    fd.append('description',data.description);
    fd.append('price',data.price);
    fd.append('id_Category',data.category);
    fd.append('image',file);
    return this.http.post(this.url+'insert_product/',fd,{headers:headers});
  }

  delete_product(id:any, token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.delete(this.url+'delete_product/'+id,{headers:headers});
  }

  get_productid(id:any, token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'get_productid/'+id,{headers:headers});
  }

  get_productcategory(id:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get(this.url+'get_productcategory/'+id);
  }

  edit_product( data:any,id: any,token:any): Observable<any>{
    if(data.Image){
      let headers = new HttpHeaders({'authorization':token});
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('description', data.description);
      fd.append('price', data.price);
      fd.append('category', data.category);
      fd.append('image', data.Image); 
      return this.http.put(this.url+'edit_product/'+id,fd,{headers:headers});
    }else{
      let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
      return this.http.put(this.url+'edit_product/'+id,data,{headers:headers});
    }
  }
}
