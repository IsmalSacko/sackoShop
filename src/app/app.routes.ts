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
import {MesCommandesComponent} from './pages/mes-commandes/mes-commandes.component';
import {PolitiquesRetourComponent} from './pages/politiques-retour/politiques-retour.component';
import {ReglagesComponent} from './pages/reglages/reglages.component';
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {RestPasswordComponent} from './auth/rest-password/rest-password.component';
import {PasswordResetConfirmComponent} from './auth/password-reset-confirm/password-reset-confirm.component';

export const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'category/:id', component: CategoryListProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'edite-profile', component: EditprofileComponent},
  {path: 'centre-aide', component: HelpCenterComponent},
  {path: 'cart', component: CartComponent},
  {path: 'mes-commandes', component: MesCommandesComponent},
  {path: 'politiques-retour', component: PolitiquesRetourComponent},
  {path: 'settings', component: ReglagesComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'reset-password', component: RestPasswordComponent},
  {path: 'password-reset-confirm/:uid/:token', component: PasswordResetConfirmComponent},
  //{ path: 'products', component: ProductsComponent }

];
