import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  public user_Data:any={};
  isCartOpen = false;
  public total_cart:any;

  public carrito:any=[
   
  ];

  constructor(
    private productService: ProductService,
    private categoryService:CategoryService,
    public router:Router
  ) {
            this.url = GLOBAL.url;
            const storedData = localStorage.getItem('user_data');
            this.user_Data = storedData ? JSON.parse(storedData) : undefined;

   }

  ngOnInit(): void {
    this.get_categories();
    this.get_products();
    this.load_Data=false;
    this.loadCartFromLocalStorage();

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

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  add_to_cart(item: any): void {
    if(this.user_Data != undefined){
      // Verificar si el producto ya existe en el carrito
    const existingProduct = this.carrito.find((producto: { _id: any; }) => producto._id === item._id);
    if (existingProduct) {
      // Incrementar la cantidad si el producto ya existe
      existingProduct.amount += 1;
    } else {
      // Agregar el producto con una cantidad inicial de 1
      item.amount = 1;
      this.carrito.push(item);
    }
    // Guardar el carrito actualizado en el localStorage
    this.saveCartToLocalStorage();
    }else{
      this.router.navigate(['/login']);

    }
    
  }
  

// Guardar carrito en localStorage
private saveCartToLocalStorage(): void {
  localStorage.setItem('carrito', JSON.stringify(this.carrito));
}

// Cargar carrito desde localStorage
private loadCartFromLocalStorage(): void {
  const storedCart = localStorage.getItem('carrito');
  if (storedCart) {
    this.carrito = JSON.parse(storedCart);
  }
}


getTotalProducts(): number {
  return this.carrito.reduce((total: any, producto: { amount: any; }) => total + producto.amount, 0);
}

removeFromCart(item: any): void {
  // Filtrar el carrito para excluir el producto con el ID correspondiente
  this.carrito = this.carrito.filter((producto: { _id: any; }) => producto._id !== item._id);
  // Guardar el carrito actualizado en el localStorage
  this.saveCartToLocalStorage();
}


decreaseAmount(item: any): void {
  // Buscar el producto en el carrito
  const existingProduct = this.carrito.find((producto: { _id: any; }) => producto._id === item._id);

  if (existingProduct) {
    // Decrementar la cantidad si es mayor a 1
    if (existingProduct.amount > 1) {
      existingProduct.amount -= 1;
    } else {
      // Si la cantidad llega a 0, eliminar el producto del carrito
      this.removeFromCart(item);
    }
    // Guardar el carrito actualizado en el localStorage
    this.saveCartToLocalStorage();
  }
}


calcularSubtotal(): number {
  return this.carrito.reduce((total: number, producto: { price: number; amount: number; }) => total + producto.price * producto.amount, 0);
}

}
