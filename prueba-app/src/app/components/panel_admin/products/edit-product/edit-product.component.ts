import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import iziToast from 'izitoast';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/servicios/category.service';
import { GLOBAL } from 'src/app/servicios/GLOBAL';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
 public product: any = {
  category:'',
  };
  public category: any = {
  };
  public token;
  public load_btn = false;
  public load_data = true;
  private destroy$ = new Subject<void>();
  public file:any=undefined;
  public imgSeleccionada: any | ArrayBuffer;
  public id:any;
  public url:any;

  constructor(
        private productService:ProductService,
        private router:Router,
        private route: ActivatedRoute,
        private categoryservice:CategoryService
  ) { 
        this.token= localStorage.getItem('token');
        this.url= GLOBAL.url
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.productService.get_productid(this.id,this.token).subscribe(
          response=>{  
            if(response.data == undefined){
              this.product = undefined;
              this.load_data = false;
            
            }else{
              console.log(response.data)
              this.product =response.data;
              this.imgSeleccionada = this.url+'get_product_image/'+this.product.Image;
              this.load_data = false;
             
            }
          }
        )
      }
    )
    this.get_categories();
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

  edit(editForm: any) {
    if (editForm.valid) {
      let data: any = {};
  
      // Verificar si se ha cargado un archivo de imagen
      if (this.file != undefined) {
        data.Image = this.file;
      }
  
      // Asignar valores del formulario al objeto data
      data.name = this.product.name;
      data.description = this.product.description;
      data.price = this.product.price;
  
      // Verificar si la categoría ha sido seleccionada o usar la existente
      if (this.product.category) {
        data.category = this.product.category; // Categoría seleccionada en el select
      } else if (this.product.id_Category?._id) {
        data.category = this.product.id_Category._id; // Categoría preasignada del producto
      } else {
        // Si no hay ninguna categoría, mostrar error y detener la ejecución
        iziToast.error({
          title: 'Error',
          message: 'Por favor, selecciona una categoría.',
          position: 'topRight',
        });
        this.load_btn = false;
        return; // Detener el proceso
      }
  
      this.load_btn = true; // Mostrar el botón de carga
  
      console.log(data); // Verificar los datos antes de enviarlos
  
      // Llamar al servicio para editar el producto
      this.productService.edit_product(data, this.id, this.token).subscribe(
        (response) => {
          iziToast.success({
            title: 'Éxito',
            message: 'Producto editado exitosamente',
            position: 'topRight',
          });
          this.router.navigate(['/Lista_productos']);
        },
        (error) => {
          console.error(error);
          iziToast.error({
            title: 'Error',
            message: 'Ocurrió un error al editar el producto.',
            position: 'topRight',
          });
          this.load_btn = false;
        }
      );
    } else {
      // Formulario no válido
      this.load_btn = false;
      iziToast.error({
        title: 'Error',
        message: 'Por favor, completa todos los campos correctamente.',
        position: 'topRight',
      });
      console.log('Formulario inválido.');
    }
  }
  

          get_categories(){
            this.categoryservice.get_categories().subscribe(
              res=>{
                this.category=res.data;
                console.log(this.category)
              }
            )
          }
}
