import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { MySharedService } from '../service/my-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moviegallery',
  templateUrl: './moviegallery.component.html',
  styleUrls: ['./moviegallery.component.css'],
})
export class MoviegalleryComponent implements OnInit {
  movies?: any[]; // Lista de películas que se va a mostrar
  role?: number; // Rol actual del usuario
  order: string = '0'; // Orden de clasificación de las películas
  title: string = ''; // Título de la película para filtrar la lista
  id?: number; // ID de la película seleccionada para eliminar o gestionar

  constructor(
    private appService: AppService, // Servicio para hacer solicitudes a la API
    private mySharedService: MySharedService, // Servicio compartido para gestionar el estado
    private router: Router // Servicio de enrutamiento para navegar entre vistas
  ) {}

  // Método de ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.role = this.mySharedService.roleActive; // Obtiene el rol activo del servicio compartido
    this.list(this.role, null, null); // Lista las películas según el rol activo
  }

  // Método para obtener la lista de películas con parámetros de rol, nombre y orden
  list(role: number | undefined, name: string | null, order: number | null) {
    this.appService.list(role, name, order).subscribe((movies: any) => {
      this.movies = []; // Limpia la lista de películas actual
      this.movies = movies; // Asigna la nueva lista de películas
    });
  }

  // Método para cambiar el rol y actualizar la lista de películas
  changeRole(role: number): void {
    this.mySharedService.changeRole(role); // Cambia el rol en el servicio compartido
    this.role = this.mySharedService.roleActive; // Actualiza el rol en el componente
    this.list(this.role, null, parseInt(this.order)); // Vuelve a listar las películas con el nuevo rol
  }

  // Método para volver a listar las películas con el título y orden actuales
  relist(): void {
    this.list(this.role, this.title, parseInt(this.order)); // Lista las películas con el título y orden actuales
  }

  // Método para eliminar una película y actualizar la lista después de la eliminación
  deleteMovie(moveId: number | undefined): void {
    this.appService.delete(moveId).subscribe((rows: any) => {
      this.relist(); // Actualiza la lista de películas después de la eliminación
    });

    // Oculta el modal de confirmación de eliminación
    const modalElement = document.getElementById('deleteModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }

  // Método para abrir el modal de confirmación de eliminación
  openModal(data: number): void {
    this.id = data; // Establece el ID de la película a eliminar
    const modalElement = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show(); // Muestra el modal
  }

  // Método para gestionar una película (navegar a la vista de gestión de película)
  movieGestion(id: number | null) {
    if (id != null) {
      this.mySharedService.updateMovie(id); // Actualiza el ID de la película en el servicio compartido
    }
    this.router.navigate(['/moviegestion']); // Redirige a la ruta de gestión de película
  }
}

