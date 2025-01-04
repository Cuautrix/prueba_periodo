import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { AppComponent } from 'src/app/app.component';
import { CompartirModule } from 'src/app/compartido.module';





@NgModule({
  declarations: [
    MenuComponent,

  ],
  imports: [
CompartirModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }