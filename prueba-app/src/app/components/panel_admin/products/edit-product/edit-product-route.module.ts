import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product.component';
import { AdminGuard } from 'src/app/guards/general.guard';

const routes: Routes = [
  {path:'', component: EditProductComponent,canActivate:[ AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProductRoutingModule { }
