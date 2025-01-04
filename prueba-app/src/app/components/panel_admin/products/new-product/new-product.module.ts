import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompartirModule } from 'src/app/compartido.module';
import { NewProductRoutingModule } from './new-product-route.module';
import { NewProductComponent } from './new-product.component';
import { MenuModule } from 'src/app/components/menu/menu.module';



@NgModule({
  declarations: [
    NewProductComponent
  ],
  imports: [
    CommonModule,
    NewProductRoutingModule,
    CompartirModule,
    MenuModule
  ]
})
export class NewProductModule { }
