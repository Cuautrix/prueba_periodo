import { Component } from '@angular/core';
import { Location } from '@angular/common'; 
import { AdminService } from 'src/app/servicios/admin.service';
import { Route, Router } from '@angular/router';
import iziToast from 'izitoast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Opcional si usas Tailwind únicamente
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  public load=false;
  public logged_user: any ={};
  public token;
  constructor(
    private location: Location,
    private adminservice:AdminService,
    private router:Router,
  ) {

    this.token = this.adminservice.getToken();
  } 


  ngOnInit(): void {
    console.log(this.token);
    if(this.token){
      this.router.navigate(['/']);
    }else{
      //mantener en el componente
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(LoginForm: { valid: any; }){
    if(LoginForm.valid){
      let data ={
        email: this.email,
        password: this.password
      }
      this.load=true;
      this.adminservice.login_user(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title:'ERROR',
              titleColor:'#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position:'topRight',
              message: response.message
            });
     
            this.load=false;
          }else{
           
            this.load=false;
            this.logged_user = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('user_data', JSON.stringify(this.logged_user));
            if(this.logged_user.rol==='Administrador'){
              this.router.navigate(['Lista_productos']);
            }else{
              this.router.navigate(['inicio']);
            }
          }
          
        }
      );
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position:'topRight',
        message: 'Formulario Invalido'
      });
    }
  }

  onBack(){
    this.location.back();

  }
}
