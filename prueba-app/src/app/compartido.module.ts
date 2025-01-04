import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { MenuModule } from './components/menu/menu.module';


@NgModule({
  imports: [
    CommonModule,
   
    
    HttpClientModule,


  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
   

  ]
})
export class CompartirModule { }