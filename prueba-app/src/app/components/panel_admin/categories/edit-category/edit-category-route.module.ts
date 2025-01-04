import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from './edit-category.component';
import { AdminGuard } from 'src/app/guards/general.guard';

const routes: Routes = [
  {path:'', component: EditCategoryComponent, canActivate:[ AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCategoryRoutingModule { }
