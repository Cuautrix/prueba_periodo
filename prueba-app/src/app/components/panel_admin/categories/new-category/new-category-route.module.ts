import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCategoryComponent } from './new-category.component';
import { AdminGuard } from 'src/app/guards/general.guard';

const routes: Routes = [
  {path:'', component: NewCategoryComponent,canActivate:[ AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCategoryRoutingModule { }
