import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './new-product.component';
import { AdminGuard } from 'src/app/guards/general.guard';

const routes: Routes = [
  {path:'', component: NewProductComponent,canActivate:[ AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProductRoutingModule { }
