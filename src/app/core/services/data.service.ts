import { Injectable } from '@angular/core';

import { Observable, forkJoin, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { bookCover } from '../mocks/book.mock';
import { Book, BookLibrary } from '../../book.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getLibrary(): Observable<BookLibrary> {
    return this.http.get<BookLibrary>(
      'https://api.airtable.com/v0/appybL1OJaEEIvAdS/Books?api_key=keymAugpaEvXsyGBr'
    );
  }

  public getBookCoverDictionary(): Observable<Map<string, string>> {
    return of(bookCover).pipe(
      map((covers) => {
        const dictionary = new Map<string, string>();

        covers.forEach((element) => {
          dictionary.set(element.id, element.picture);
        });
        return dictionary;
      })
    );
  }

  public getCompiledLibraryData(): Observable<Book[]> {
    return forkJoin([this.getLibrary(), this.getBookCoverDictionary()]).pipe(
      map(([data, mapperBookCover]) => {
        return data.records.map((book) => ({
          ...book,
          fields: {
            ...book.fields,
            picture: mapperBookCover.get(book.id),
          },
        }));
      })
    );
  }
}
