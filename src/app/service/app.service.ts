import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Movie } from '../model/movie.model'; 

@Injectable({
  providedIn: 'root', 
})
export class AppService {
  private api = 'http://localhost:8080/api/'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Función para listar películas basadas en ciertos filtros (rol, nombre de película, y orden)
  list(
    role: number | null | undefined,  // El rol que puede ser un número, null o indefinido
    movieName: string | null,  // El nombre de la película, puede ser null
    order: number | null  // El orden de los resultados, puede ser null
  ) {
    let httpParams = new HttpParams();  
    httpParams = httpParams.append('active', role == 1 ? 1 : 2);  // Añade el parámetro 'active' basado en el rol

    // Si hay un orden, lo añade a los parámetros
    if (order != null) {
      httpParams = httpParams.append('order', order);
    }

    // Si el nombre de la película no está vacío, lo añade a los parámetros
    if (!this.isEmptyOrWhitespace(movieName)) {
      httpParams = httpParams.append(
        'movieName',
        movieName?.toUpperCase() ?? ''  // Convierte el nombre de la película a mayúsculas
      );
    }

    // Hace una solicitud GET a la API con los parámetros
    return this.http.get(this.api + 'list', { params: httpParams });
  }

  // Función para añadir una nueva película
  addMovie(movie: Movie) {
    // Hace una solicitud POST para añadir la película
    return this.http.post<number>(this.api + 'add', movie);
  }

  // Función para actualizar una película existente
  updateMovie(movie: Movie) {
    // Hace una solicitud POST para actualizar la película
    return this.http.post<number>(this.api + 'edit', movie);
  }
  
  // Función para eliminar una película basada en su ID
  delete(movieId: number | undefined) {
    let httpParams = new HttpParams();  // Inicializa los parámetros HTTP
    httpParams = httpParams.append('id', movieId ?? 0);  // Añade el ID de la película (si es undefined, usa 0)
    // Hace una solicitud GET para eliminar la película
    return this.http.get(this.api + 'delete', { params: httpParams });
  }

  // Función para buscar una película por su ID
  find(movieId: number | undefined) {
    let httpParams = new HttpParams();  // Inicializa los parámetros HTTP
    httpParams = httpParams.append('id', movieId ?? 0);  // Añade el ID de la película (si es undefined, usa 0)
    // Hace una solicitud GET para obtener los detalles de la película
    return this.http.get(this.api + 'find', { params: httpParams });
  }

  // Función auxiliar para verificar si un string está vacío o solo contiene espacios en blanco
  isEmptyOrWhitespace(value: string | null | undefined): boolean {
    return !value || !value.trim();  // Devuelve true si el valor es nulo, indefinido o solo espacios en blanco
  }
}
