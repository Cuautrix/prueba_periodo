import { Component, OnInit } from '@angular/core';
import iziToast from 'izitoast';
import { CategoryService } from 'src/app/servicios/category.service';
import { GLOBAL } from 'src/app/servicios/GLOBAL';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  public categories: Array<any> = [];
  public url;
  public token;
  constructor(
    private CategoryService:CategoryService
  ) { 
        this.url = GLOBAL.url;
        this.token=localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.get_categories();

  }

  
  get_categories(){
    this.CategoryService.get_categories().subscribe(
      res=>{
          this.categories=res.data;
          console.log(this.categories)
      }
    )
  }

  editCategory(id:any){

  }

  deleteCategory(id:any){
    this.CategoryService.delete_category(id,this.token).subscribe(
      res=>{
        iziToast.success({
          title: 'Éxito',
          message: 'Categoría eliminada exitosamente',
          position: 'topRight'
        });
        this.get_categories();
      }, err=>{
        iziToast.success({
          title: 'Error',
          message: 'Fallo al eliminar categoria',
          position: 'topRight'
        });
      }
    )
  }
}
