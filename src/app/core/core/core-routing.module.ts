import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { VideoComponent } from './video/video.component';
import { PlayerComponent } from './player/player.component';
import { ShopComponent } from './shop/shop.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ProductDetailComponent } from "src/app/core/core/product-detail/product-detail.component";
import { OrderDetailComponent } from "src/app/core/core/order-detail/order-detail.component";
import { CartComponent } from "src/app/core/core/cart/cart.component";
import { ProfileComponent } from "src/app/core/core/profile/profile.component";
import { DashboardComponent } from "src/app/core/core/dashboard/dashboard.component";

const coreRoutes: Routes = [
    {path: '', component: CoreComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'videos', component: VideoComponent },
    { path: 'players', component: PlayerComponent },
    { path: 'player-details/:playerId', component: PlayerDetailsComponent },
    { path: 'product-details/:productId',component:ProductDetailComponent },
    { path: 'order-details',component:OrderDetailComponent},
    { path: 'cart/:productId',component:CartComponent},
    { path: 'shop' , component: ShopComponent },
    { path: 'profile/:userId' , component:ProfileComponent },
    { path : 'aboutUs' , component: AboutUsComponent },
    { path : 'admin' , component: DashboardComponent },
    { path : '**', redirectTo: 'login' }
]}
];

@NgModule({
    imports: [
        RouterModule.forChild(coreRoutes)
      ],
      exports: [RouterModule]
})

export class CoreRoutingModule { }

