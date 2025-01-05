import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/servicios/category.service';
import { GLOBAL } from 'src/app/servicios/GLOBAL';
import { ProductService } from 'src/app/servicios/product.service';

// core version + navigation, pagination modules:
import Swiper from 'swiper';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  public products: Array<any> = [];
  public categories: Array<any> = [];
  public url;
  public load_Data=true;
  constructor(
    private productService: ProductService,
    private categoryService:CategoryService
  ) {
            this.url = GLOBAL.url;
    
   }

  ngOnInit(): void {
    this.get_categories();
    this.get_products();
    this.load_Data=false;

  }

  get_products(){
    this.productService.get_products().subscribe(
      res=>{
          this.products=res.data; 
      }
    )
  }

  get_categories(){
    this.categoryService.get_categories().subscribe(
      res=>{
        this.categories=res.data;
      }
    )
  }

  scrollCarousel(direction: string): void {
    const carousel = this.carousel.nativeElement;
    const scrollAmount = 300; // Cantidad de desplazamiento
  
    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  scrollToProducts(id:any) {
    this.load_Data=true;
    this.productService.get_productcategory(id).subscribe(
      res=>{
        this.products=res.data;
        this.load_Data=false;
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    )
   

    
  }
}
