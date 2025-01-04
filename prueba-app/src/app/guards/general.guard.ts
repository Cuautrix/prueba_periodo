import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../servicios/admin.service';

@Injectable({
    providedIn: 'root'
  })
  
export class AdminGuard implements CanActivate {
    public rol:any;
    
    constructor(
      private adminservice: AdminService,
      private router: Router,
    ){
    }
    canActivate():any{
      if(!this.adminservice.isAuthenticated(['Administrador'])){
        
                 this.router.navigate(['/login']);
       
    }else{
        this.rol= 'Administrador';
        return true;
      }
    }
    
  }