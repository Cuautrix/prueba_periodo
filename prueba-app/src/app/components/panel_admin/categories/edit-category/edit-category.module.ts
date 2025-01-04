import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompartirModule } from 'src/app/compartido.module';
import { EditCategoryComponent } from './edit-category.component';
import { EditCategoryRoutingModule } from './edit-category-route.module';
import { MenuModule } from 'src/app/components/menu/menu.module';




@NgModule({
  declarations: [
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    EditCategoryRoutingModule,
    CompartirModule,
    MenuModule

  ]
})
export class EditCategoryModule { }
