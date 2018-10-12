import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './core/home/home.component';
import { TestimonialComponent } from './core/home/testimonial/testimonial.component';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { EmbedVideo } from 'ngx-embed-video';
import { ChatComponent } from "src/app/core/core/chat/chat.component";
//import { ChatComponent } from './chat/chat.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TestimonialComponent,
    ChatComponent
   
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    FlashMessagesModule,
    EmbedVideo.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
