import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';
import {CategoryListProductsComponent} from './category-list-products/category-list-products.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'category/:id', component:CategoryListProductsComponent},
  { path: '', component:LoginComponent},
  //{ path: 'products', component: ProductsComponent }

];
