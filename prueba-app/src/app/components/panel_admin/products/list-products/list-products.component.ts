import { Component, OnInit } from '@angular/core';
import iziToast from 'izitoast';
import { GLOBAL } from 'src/app/servicios/GLOBAL';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  public products: Array<any> = [];
  public url;
  public token;
  constructor(
    private productService:ProductService
  ) { 
    this.url = GLOBAL.url;
    this.token=localStorage.getItem('token');

  }

  ngOnInit(): void {
    this.get_products();
  }

  get_products(){
    this.productService.get_products().subscribe(
      res=>{
          this.products=res.data; 
          console.log(this.products)
      }
    )
  }

  editProduct(id:any){

  }

  deleteProduct(id:any){
    this.productService.delete_product(id,this.token).subscribe(
      res=>{
        iziToast.success({
          title: 'Éxito',
          message: 'Categoría eliminada exitosamente',
          position: 'topRight'
        });
        this.get_products();
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
