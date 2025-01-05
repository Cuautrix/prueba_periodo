import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/servicios/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import iziToast from 'izitoast';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  public category: any = {
  };
  public product: any = {
    category: '',
  };
  public token;
  public load_btn = false;
  public file:any=undefined;
  public imgSeleccionada : any | ArrayBuffer ;
  private destroy$ = new Subject<void>();

  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
  ) { 
    this.token = localStorage.getItem('token');
    this.get_categories();

    
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
        console.log(this.product)
        this.productService
          .insert_product(this.product, this.file, this.token)
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
              this.router.navigate(['/Lista_productos']);
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


  get_categories(){
    this.categoryService.get_categories().subscribe(
      res=>{
        this.category=res.data;
        console.log(this.category)
      }
    )
  }

}
