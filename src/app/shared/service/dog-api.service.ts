import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DogSearchImg } from '../model/dog.model';
import { Infos, PostFavorite } from '../model/infosPet.model';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {

  apiUrl = 'https://api.thedogapi.com/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      'x-api-key': 'live_ekZ8ZZvYLVSfUpPBahuhx78k5Wo5R2LtINR4SeFTCOqYxvw3zKSDjtNt8XPUtWB3'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  //metodos para consumir a api

  public getDogs(): Observable<Infos[]> {
    return this.httpClient.get<Infos[]>(this.apiUrl + 'breeds');
  };

  public getDogsName(name: string): Observable<Infos[]> {
    return this.httpClient.get<Infos[]>(this.apiUrl + `breeds/search?q=${name}`)
  };

  public getDogsImage(img: string): Observable<DogSearchImg> {
    return this.httpClient.get<DogSearchImg>(this.apiUrl + `images/${img}`)
  };

  /* tentativa de favoritar a imagem usando get e post, testei no postman o image_id e ele me retornou success, porem ao enviar em meu código
  no post ele deu image_id is required, não consegui descobrir o motivo desse erro */

  /* public getFavoriteDogs(): Observable<Infos[]> {
    return this.httpClient.get<Infos[]>(this.apiUrl + `favourites`)
  } */

  /* public postFavoriteDogs(favorito: PostFavorite): Observable<Infos[]> {
    console.log(favorito);
    return this.httpClient.post<Infos[]>(`https://api.thedogapi.com/v1/favourites`, favorito, this.httpOptions)
  }; */

};
