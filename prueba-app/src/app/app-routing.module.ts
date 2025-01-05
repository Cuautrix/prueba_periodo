import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'inicio', pathMatch:'full'},

  { path: 'inicio',loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule) } ,
  { path: 'login',loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'Lista_productos',loadChildren: () => import('./components/panel_admin/products/list-products/list-products.module').then(m => m.ListProductsModule) },
  { path: 'Editar_producto/:id',loadChildren: () => import('./components/panel_admin/products/edit-product/edit-product.module').then(m => m.EditProductModule) },
  { path: 'Agregar_producto',loadChildren: () => import('./components/panel_admin/products/new-product/new-product.module').then(m => m.NewProductModule) },

  { path: 'Lista_categorias',loadChildren: () => import('./components/panel_admin/categories/list-categories/list-categories.module').then(m => m.ListCategoriesModule) },
  { path: 'Editar_categoria/:id',loadChildren: () => import('./components/panel_admin/categories/edit-category/edit-category.module').then(m => m.EditCategoryModule) },
  { path: 'Agregar_categoria',loadChildren: () => import('./components/panel_admin/categories/new-category/new-category.module').then(m => m.NewCategoryModule) },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

