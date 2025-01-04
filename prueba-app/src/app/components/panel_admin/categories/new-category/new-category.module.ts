import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompartirModule } from 'src/app/compartido.module';

import { NewCategoryComponent } from './new-category.component';
import { NewCategoryRoutingModule } from './new-category-route.module';
import { MenuModule } from 'src/app/components/menu/menu.module';




@NgModule({
  declarations: [
    NewCategoryComponent
  ],
  imports: [
    CommonModule,
    NewCategoryRoutingModule,
    CompartirModule,
    MenuModule
  ]
})
export class NewCategoryModule { }
