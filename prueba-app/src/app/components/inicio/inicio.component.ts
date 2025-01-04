import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/servicios/category.service';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public products: Array<any> = [];
  public categories: Array<any> = [];
  constructor(
    private productService: ProductService,
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.get_categories();
    this.get_products();
  }

  get_products(){
    this.productService.get_products().subscribe(
      res=>{
          res.data=this.products; 
      }
    )
  }

  get_categories(){
    this.categoryService.get_categories().subscribe(
      res=>{
          res.data=this.categories;
      }
    )
  }
}
