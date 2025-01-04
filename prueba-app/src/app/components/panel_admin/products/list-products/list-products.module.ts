import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompartirModule } from 'src/app/compartido.module';
import { ListProductsComponent } from './list-products.component';
import { ListProductsRoutingModule } from './list-products-route.module';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MenuModule } from 'src/app/components/menu/menu.module';



@NgModule({
  declarations: [
    ListProductsComponent
    
  ],
  imports: [
    CommonModule,
    ListProductsRoutingModule,
    CompartirModule,
   MenuModule
  ]
})
export class ListProductsModule { }
