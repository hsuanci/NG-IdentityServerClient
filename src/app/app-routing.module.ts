import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {
  AuthGuardService as AuthGuard
} from './authentication/AuthGuardService';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: `login`, component: LoginComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: MainComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
