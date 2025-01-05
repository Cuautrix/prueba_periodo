import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/servicios/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import iziToast from 'izitoast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  public category: any = {
  };
  public token;
  public load_btn = false;
  public file:any=undefined;
  public imgSeleccionada : any | ArrayBuffer ;
  private destroy$ = new Subject<void>();

  constructor(
    private categoryService:CategoryService,
    private router:Router,
  ) { 
    this.token = localStorage.getItem('token');

  }

  ngOnInit(): void {

  }


  registro(registroForm: any) {
    if (registroForm.valid) {
      if (this.file === undefined) {
        iziToast.error({
          title: 'Error',
          message: 'Necesitas subir la foto de la categoría',
          position: 'topRight'
        });
      } else {
        this.load_btn = true;
        this.categoryService
          .insert_category(this.category, this.file, this.token)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            response => {
              iziToast.success({
                title: 'Éxito',
                message: 'Categoría registrada exitosamente',
                position: 'topRight'
              });
              this.load_btn = false;
              // Redirigir a la ruta lista_productos
              this.router.navigate(['/Lista_categorias']);
            },
            error => {
              iziToast.error({
                title: 'Error',
                message: 'Hubo un problema al registrar la categoría',
                position: 'topRight'
              });
              this.load_btn = false;
            }
          );
      }
    } else {
      iziToast.warning({
        title:'ERROR',
              titleColor:'#FF0000',
              color: '#FFF',
              class: 'text-danger',
            
        message: 'Por favor, completa correctamente el formulario',
        position: 'topRight'
      });
    }
  }

  eventodecambiodeimagen(event:any):void{
    var file:any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    }else{
     //no imagen seleciconada
    }
    if(file.size <= 4000000){
      if(file.type == 'image/png' || file.type == 'image/webp'  || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this.imgSeleccionada = reader.result;
        reader.readAsDataURL(file);
        const label = document.getElementById('perfil');
        if (label) {
          label.textContent = file.name;
        }
        this.file = file;
      }else{
         //anuncio de que el earchivo debe ser imagen
         const label = document.getElementById('perfil');
         if (label) {
           label.textContent = 'Seleccionar imagen';
         }
        this.imgSeleccionada = 'assets/img/01.jpg';
        this.file = undefined;
      }
    }else{
       //imagen no puede superar los 4mb

       const label = document.getElementById('perfil');
      if (label) {
        label.textContent = 'Seleccionar imagen';
      }
      this.imgSeleccionada = 'assets/img/01.jpg';
      this.file = undefined;
    }
  }

}
