import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { HomeComponent } from './core/home/home.component';



const appRoutes: Routes = [
    { path: 'index', component: HomeComponent },
    {
        path: 'home',
        loadChildren: './core/core/core.module#CoreModule'
      },
      {
        path: 'admin-access',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: 'user-access',
        loadChildren: './user/user.module#UserModule'
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index/x_Token/:Token/user/:user/type/:type', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
      ],
      exports: [RouterModule]
})

export class AppRoutingModule { }
