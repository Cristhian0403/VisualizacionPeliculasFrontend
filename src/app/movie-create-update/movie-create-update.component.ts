import { Component, OnInit } from '@angular/core';
import { MySharedService } from '../service/my-shared.service';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-movie-create-update',
  templateUrl: './movie-create-update.component.html',
  styleUrls: ['./movie-create-update.component.css'],
})
export class MovieCreateUpdateComponent implements OnInit {
  // Objeto de película con valores iniciales
  movie: Movie = {
    movieid: null,
    name: '',
    image: '',
    description: '',
    status: 1,
    score: 0,
  };

  constructor(
    private mySharedService: MySharedService, // Servicio compartido para obtener el ID de la película a editar
    private appService: AppService, // Servicio para hacer solicitudes a la API
    private router: Router // Servicio de enrutamiento para navegar entre vistas
  ) {}

  // Método de ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Si hay un ID de película en el servicio compartido, se busca la película para editar
    if (this.mySharedService.movieId != null) {
      this.appService
        .find(this.mySharedService.movieId) // Busca la película por ID
        .subscribe((movies: any) => {
          this.movie = movies; // Asigna la película encontrada al objeto movie
          console.log(this.movie); // Imprime la película en la consola para depuración
        });
    }
  }

  // Método para enviar el formulario de creación o actualización de película
  submitForm() {
    // Si el ID de la película no es null, se actualiza la película existente
    if (this.movie.movieid != null) {
      this.appService.updateMovie(this.movie).subscribe({
        next: (response) => {
          console.log('Movie Update successfully:', response); // Imprime el éxito de la actualización
          this.router.navigate(['/home']); // Redirige a la página de inicio después de la actualización
        },
        error: (error: any) => {
          alert('Error en la actualización de la película'); // Muestra un mensaje de error en caso de fallo
        },
      });
    } else {
      // Si el ID de la película es null, se crea una nueva película
      this.appService.addMovie(this.movie).subscribe({
        next: (response) => {
          console.log('Movie added successfully:', response); // Imprime el éxito de la adición
          this.router.navigate(['/home']); // Redirige a la página de inicio después de añadir la película
        },
        error: (error: any) => {
          alert('Error en la creación de la película'); // Muestra un mensaje de error en caso de fallo
        },
      });
    }
  }

  // Método para actualizar la vista previa de la imagen de la película
  updateImage() {
    const imageUrl = (document.getElementById('movieUrl') as HTMLInputElement)
      .value; // Obtiene la URL de la imagen del campo de entrada
    const imagePreview = document.getElementById(
      'movieImagePreview'
    ) as HTMLImageElement; // Obtiene el elemento de vista previa de la imagen

    if (imageUrl) {
      imagePreview.src = imageUrl; // Establece la URL de la imagen en el elemento de vista previa
      imagePreview.style.display = 'block'; // Muestra la imagen
    } else {
      imagePreview.src = ''; // Limpia la URL de la imagen
      imagePreview.style.display = 'none'; // Oculta la imagen si no hay URL
    }
  }
}
