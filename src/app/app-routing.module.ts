import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCreateUpdateComponent } from './movie-create-update/movie-create-update.component';
import { MoviegalleryComponent } from './moviegallery/moviegallery.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta raíz al nuevo componente
  { path: 'home', component: MoviegalleryComponent },
  { path: 'moviegestion', component: MovieCreateUpdateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
