import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  public products: Array<any> = [];

  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.get_products();
  }

  get_products(){
    this.productService.get_products().subscribe(
      res=>{
          res.data=this.products; 
      }
    )
  }
}
