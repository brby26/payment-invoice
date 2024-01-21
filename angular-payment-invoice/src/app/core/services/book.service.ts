import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }
  url = "https://openlibrary.org/search.json?title=the+lord+of+the+rings&limit=1"

  get books(){
    return this.httpClient.get<any>(this.url);
  }

}
