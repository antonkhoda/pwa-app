import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Library {
  offset: string;
  records: Book[];
}

export interface Book {
  createdTime: string;
  fields: BookFields;
  id: string[];
}

export interface BookFields {
  Amazon_Link: string;
  Author: string;
  Country: string;
  Title: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getLibrary(): Observable<Library> {
    return this.http.get<Library>('https://api.airtable.com/v0/appybL1OJaEEIvAdS/Books?api_key=keymAugpaEvXsyGBr')
  }
}
