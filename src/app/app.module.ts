import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieCreateUpdateComponent } from './movie-create-update/movie-create-update.component';
import { MoviegalleryComponent } from './moviegallery/moviegallery.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieCreateUpdateComponent,
    MoviegalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
