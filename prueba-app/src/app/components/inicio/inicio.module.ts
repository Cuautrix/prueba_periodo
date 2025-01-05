import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { CompartirModule } from 'src/app/compartido.module';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from '../menu/menu.module';




@NgModule({
  declarations: [
    InicioComponent
    
  ]
  ,
  imports: [
    CommonModule,
    InicioRoutingModule,
    CompartirModule,
  MenuModule
  ]
})
export class InicioModule { }
