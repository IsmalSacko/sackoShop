import {Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';
import {CategoryListProductsComponent} from './category-list-products/category-list-products.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {EditprofileComponent} from './editprofile/editprofile.component';
import {HelpCenterComponent} from './help-center/help-center.component';
import {CartComponent} from './cart/cart.component';

export const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'category/:id', component: CategoryListProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: '', component: EditprofileComponent},
  {path: 'centre-aide', component: HelpCenterComponent},
  {path: 'cart', component: CartComponent}
  //{ path: 'products', component: ProductsComponent }

];
