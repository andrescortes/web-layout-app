import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingRoutingModule } from './auth-routing-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingRoutingModule
  ]
})
export class AuthModule { }
