import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import iziToast from 'izitoast';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/servicios/category.service';
import { GLOBAL } from 'src/app/servicios/GLOBAL';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
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
    private categoryService:CategoryService,
    private router:Router,
    private route: ActivatedRoute,

  ) { 
    this.token= localStorage.getItem('token');
    this.url= GLOBAL.url
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.categoryService.get_category_by_id(this.id,this.token).subscribe(
          response=>{  
            if(response.data == undefined){
              this.category = undefined;
              this.load_data = false;
            }else{
              this.category =response.data;
              this.imgSeleccionada = this.url+'get_category_image/'+this.category.Image;
              this.load_data = false;
            }
          }
        )
      }
    )
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

  edit(actualizarForm:any){
    if(actualizarForm.valid){
      var data: any={};
      if(this.file != undefined){
        data.Image = this.file;
      }
      //console.log(data.imagen);
      data.name = this.category.name;
      data.description = this.category.description;
 


      this.load_btn = true;
      this.categoryService.edit_category(data,this.id,this.token).subscribe(
        response =>{
                    iziToast.success({
                      title: 'Éxito',
                      message: 'Categoría editada exitosamente',
                      position: 'topRight'
                    });
                    this.router.navigate(['/Lista_categorias']);

                },
                error => {
                  console.error(error);
                  // Manejar el error según tus necesidades.
                  this.load_btn = false;
                }
              );
            } else {
              // Datos del formulario no válidos
              this.load_btn = false;
              console.log('datos del fom no valid');
            }
          }

}
