import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MySharedService {
  public roleActive: any;
  
  public movieId: number|null;

  // Constructor que inicializa las propiedades con valores predeterminados
  constructor() {
    this.roleActive = 1;  // Establece el rol activo inicial en 1 (El del usuario)
    this.movieId = null;  // Inicializa movieId como null
  }

  // Método para cambiar el rol activo si el nuevo rol es diferente al actual (Usuario / Admin)
  changeRole(role: number){
    if(role != this.roleActive) this.roleActive = role;  // Cambia roleActive solo si es diferente al rol actual
  }

  // Método para guardar el id de la pelicula a actualizar y acceder desde otros componentes
  updateMovie(id: number){
    this.movieId = id;  // Asigna el nuevo ID de película a movieId
  }
}
