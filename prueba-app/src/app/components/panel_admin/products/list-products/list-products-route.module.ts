import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products.component';
import { AdminGuard } from 'src/app/guards/general.guard';

const routes: Routes = [
  {path:'', component: ListProductsComponent,canActivate:[ AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductsRoutingModule { }
