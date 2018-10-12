import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { VideoComponent } from './video/video.component';
import { PlayerComponent } from './player/player.component';
import { ShopComponent } from './shop/shop.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    HttpModule ,
    HttpClientModule,
    CarouselModule,
    FlashMessagesModule
  ],
  declarations: [
    CoreComponent,
    LoginComponent,
    VideoComponent,
    PlayerComponent,
    ShopComponent,
    AboutUsComponent,
    PlayerDetailsComponent,
    ProductDetailComponent,
    OrderDetailComponent,
    CartComponent,
    ProfileComponent,
    DashboardComponent
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class CoreModule { }
