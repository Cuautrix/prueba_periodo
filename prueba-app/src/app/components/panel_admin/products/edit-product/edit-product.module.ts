import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompartirModule } from 'src/app/compartido.module';
import { EditProductRoutingModule } from './edit-product-route.module';
import { EditProductComponent } from './edit-product.component';
import { MenuModule } from 'src/app/components/menu/menu.module';




@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    EditProductRoutingModule,
    CompartirModule,
    MenuModule
  ]
})
export class EditProductModule { }
