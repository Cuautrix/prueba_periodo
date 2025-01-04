import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { GLOBAL } from './GLOBAL';  
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })
  export class AdminService {
    public url;
    constructor(
      private http: HttpClient,
    ) { 
      this.url =GLOBAL.url;
    }

    login_user(data: any): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.url+'login_user',data,{headers:headers});
    }

    
  getToken(){
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles:string[]):boolean{
    //Se verifica si existe un token
    const token:any =  localStorage.getItem('token'); 
    if(!token){
      return false; //si no hay token retorna falso
    }

    //Se verifica si el token que llega es valido
    try{
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      //console.log(decodedToken);
      
      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;       
      }

      if(!decodedToken){
        console.log('No acceso');
        localStorage.removeItem('token');
        return false;
        
      }
    }catch(error){
      localStorage.removeItem('token');
      return false;
    }
    
  
    return allowRoles.includes(decodedToken['role']);
  }


  obtener_admin_usuario( id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'obtener_admin_usuario/'+id,{headers:headers});
  }


  obtener_boletos_por_rango(numero:number, token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'obtener_boletos_por_rango/'+numero,{headers:headers});
  }

  obtener_boletos_busqueda(numero:number, token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'obtener_boletos_busqueda/'+numero,{headers:headers});
  }
  obtener_boletos_verificar(numero:number): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get(this.url+'obtener_boletos_verificar/'+numero);
  }



  ////venta boletos

  comprar_boleto(id:any,data:any ,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.put(this.url+'comprar_boleto/'+id,data,{headers:headers});
  }
  quitar_boleto(id:any,data:any ,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.put(this.url+'quitar_boleto/'+id,data,{headers:headers});
  }

  
  obtener_boletos_carrito( id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'obtener_boletos_carrito/'+id,{headers:headers});
  }
  obtener_total(token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'obtener_total',{headers:headers});
  }
  obtener_ventas(token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'obtener_ventas',{headers:headers});
  }
 
  registrar_venta( data:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.post(this.url+'registrar_venta/',data,{headers:headers});
  }
  cancelar_boleto( id:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.get(this.url+'cancelar_boleto/'+ id,{headers:headers});
  }
  cancelar_boletos(data:any,token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
    return this.http.post(this.url+'cancelar_boletos',data,{headers:headers});
  }

  filtro_encargado(nombre: string, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
    // Crea un objeto con los parámetros necesarios
    let params = new HttpParams()
        .set('nombre', nombre)
    // Realiza la solicitud GET con los parámetros
    return this.http.get(this.url + 'filtro_encargado', { headers: headers, params: params });
}


obtener_boletos(token:any): Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json','authorization':token});
  return this.http.get(this.url+'obtener_boletos',{headers:headers});
}
}
