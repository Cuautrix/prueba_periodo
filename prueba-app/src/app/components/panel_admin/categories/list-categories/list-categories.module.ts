import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompartirModule } from 'src/app/compartido.module';
import { ListCategoriesComponent } from './list-categories.component';
import { ListCategoriesRoutingModule } from './list-categories-route.module';
import { MenuModule } from 'src/app/components/menu/menu.module';




@NgModule({
  declarations: [
    ListCategoriesComponent
  ],
  imports: [
    CommonModule,
    ListCategoriesRoutingModule,
    CompartirModule,
    MenuModule
  ]
})
export class ListCategoriesModule { }
