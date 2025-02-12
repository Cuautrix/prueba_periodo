import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { GLOBAL } from './GLOBAL';  
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
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

//   cancelar_boleto( id:any,token:any): Observable<any>{
//     let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
//     return this.http.get(this.url+'cancelar_boleto/'+ id,{headers:headers});
//   }
//   cancelar_boleto( id:any,token:any): Observable<any>{
//     let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
//     return this.http.get(this.url+'cancelar_boleto/'+ id,{headers:headers});
//   }
get_categories( ): Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json'});
  return this.http.get(this.url+'get_categories/');
}
insert_category(data:any, file: any,token:any): Observable<any>{
  let headers = new HttpHeaders({'authorization':token});
  const fd = new FormData();
  fd.append('name',data.name);
  fd.append('description',data.description);
  fd.append('image',file);
  return this.http.post(this.url+'insert_category/',fd,{headers:headers});
}

delete_category(id:any, token:any): Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
  return this.http.delete(this.url+'delete_category/'+id,{headers:headers});
}

get_category_by_id(id:any, token:any): Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
  return this.http.get(this.url+'get_category_by_id/'+id,{headers:headers});
}

edit_category( data:any,id: any,token:any): Observable<any>{
  if(data.Image){
    let headers = new HttpHeaders({'authorization':token});
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('description', data.description);
    fd.append('image', data.Image); 
    return this.http.put(this.url+'edit_category/'+id,fd,{headers:headers});
  }else{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.put(this.url+'edit_category/'+id,data,{headers:headers});
  }
}
}
